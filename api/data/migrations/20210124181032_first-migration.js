exports.up = async (knex) => {
  await knex.schema.createTable("users", (users) => {
    users.increments("user_id");
    users.string("username", 200).notNullable();
    users.string("password", 200).notNullable();
    users.string("first").notNullable();
    users.timestamps(false, true);
  });
  await knex.schema.createTable("messages", (messages) => {
    messages.increments("message_id");
    messages.string("first").notNullable();
    messages.string("last").notNullable();
    messages.string("phone");
    messages.string("email").notNullable();
    messages.string("message", 100000).notNullable();
    messages.timestamps(false, true);
  });
};

exports.down = async (knex) => {

  await knex.schema.dropTableIfExists("messages");
  await knex.schema.dropTableIfExists("users");
};
