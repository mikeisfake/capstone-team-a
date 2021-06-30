const northArkService = {
  getAll(knex) {
    return knex.select('*').from('northArk');
  },

  getById(knex, id) {
    return knex
      .from('northArk')
      .select('*')
      .where({ id })
      .first();
  },
};

module.exports = northArkService;