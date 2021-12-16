exports.up = async (knex) => {
  await knex.schema
    .createTable('users', (users) => {
      users.increments('user_id')
      users.string('username', 200).notNullable()
      users.string('password', 200).notNullable()
      users.timestamps(false, true)
    })
    await knex.schema
      .createTable('messages',(messages)=>{
        messages.increments('message_id')
        messages.string('first').notNullable()
        messages.string('last').notNullable()
        messages.integer('phone')
        messages.string('email').notNullable()
        messages.string('message').notNullable()
      })
    await knex.schema
      .createTable('categories', (categories)=>{
        categories.increments('category_id')
        categories.string('category').notNullable()
      })
}

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('categories')
  await knex.schema.dropTableIfExists('messages')
  await knex.schema.dropTableIfExists('users')
}
