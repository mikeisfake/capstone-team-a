const northArkService = {
  getAll(knex) {
    return knex.select('*').from('northArk');
  },
  //add new restaurant
  insert(knex) {
    return knex
      .insert()
      .into('northArk')
      .returning('*')
      .then(rows => {
        return rows[0];
      });
  },

  getById(knex, id) {
    return knex
      .from('northArk')
      .select('*')
      .where({ id })
      .first();
  },

  delete(knex, id) {
    console.log(id)
    return knex('northArk').where({ id }).delete();
  },

  edit(knex, id, edited) {
    return knex('northArk')
      .where({ id })
      .update(edited);
  }
};

module.exports = northArkService;