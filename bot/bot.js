const { Telegraf, Markup } = require('telegraf');

const bot = new Telegraf('7716561649:AAFtoYBAhoBclJNEkY304PVojjig56YoGZk');

const users = {};
const events = [];

const contactKeyboard = Markup.keyboard([
  [Markup.button.contactRequest('Share Contact')]
]).resize();

const mainMenu = Markup.keyboard([
  ['CREATE', 'FINDALL']
]).resize();

bot.start((ctx) => {
  const userId = ctx.from.id;

  if (users[userId]?.contactShared) {
    ctx.reply('Menu bilan ishlashingiz mumkin:', mainMenu);
  } else {
    ctx.reply('Kontaktni yuborish uchun tugmani bosing:', contactKeyboard);
  }
});

bot.on('contact', (ctx) => {
  const userId = ctx.from.id;

  users[userId] = { contactShared: true };
  ctx.reply('Kontakt qabul qilindi.\nEndi menyudan foydalanishingiz mumkin:', mainMenu);
});

bot.hears('CREATE', (ctx) => {
  const userId = ctx.from.id;

  if (!users[userId]?.contactShared) {
    ctx.reply('Iltimos, avval kontaktni yuboring:', contactKeyboard);
    return;
  }

  users[userId].step = 'title';
  users[userId].data = {};
  ctx.reply('Tadbir nomini kiriting:');
});

bot.hears('FINDALL', (ctx) => {
  const userId = ctx.from.id;

  if (!users[userId]?.contactShared) {
    ctx.reply('Iltimos, avval kontaktni yuboring:', contactKeyboard);
    return;
  }

  if (events.length === 0) {
    ctx.reply('Hozircha tadbirlar yoq.');
  } else {
    const text = events.map((e, i) =>
      `${i + 1}) ${e.title} - ${e.description}\nMuallif: ${e.author}\n${e.startDate} → ${e.endDate}`
    ).join('\n\n');

    ctx.reply('Barcha tadbirlar:\n\n' + text);
  }
});

bot.on('text', (ctx) => {
  const userId = ctx.from.id;
  const user = users[userId];

  if (!user?.step) return;

  const text = ctx.message.text;

  if (user.step === 'title') {
    user.data.title = text;
    user.step = 'description';
    ctx.reply('Tavsifni kiriting:');
  } else if (user.step === 'description') {
    user.data.description = text;
    user.step = 'author';
    ctx.reply('Muallifni kiriting:');
  } else if (user.step === 'author') {
    user.data.author = text;
    user.step = 'startDate';
    ctx.reply('Boshlanish sanasi (YYYY-MM-DD):');
  } else if (user.step === 'startDate') {
    user.data.startDate = text;
    user.step = 'endDate';
    ctx.reply('Tugash sanasi (YYYY-MM-DD):');
  } else if (user.step === 'endDate') {
    user.data.endDate = text;
    events.push(user.data);
    user.step = null;
    user.data = null;

    ctx.reply('Tadbir muvaffaqiyatli yaratildi!', mainMenu);
  }
});

bot.launch();
console.log('Bot ishga tushdi...');
