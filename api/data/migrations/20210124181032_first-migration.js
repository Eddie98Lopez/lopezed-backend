exports.up = async (knex) => {
  await knex.schema.createTable("users", (users) => {
    users.increments("user_id");
    users.string("username", 200).notNullable();
    users.string("password", 200).notNullable();
    users.timestamps(false, true);
  });
  await knex.schema.createTable("messages", (messages) => {
    messages.increments("message_id");
    messages.string("first").notNullable();
    messages.string("last").notNullable();
    messages.integer("phone");
    messages.string("email").notNullable();
    messages.string("message").notNullable();
    messages.timestamps(false, true);
  });
  await knex.schema.createTable("categories", (categories) => {
    categories.increments("category_id");
    categories.string("category").notNullable();
  });
  await knex.schema("series", (series) => {
    series.increments("series_id");
    series.string("series_name").notNullable();
    series.string("series_description", 10000).notNullable();
    series.string("cover_photo");
    series.boolean().defaultTo(true);
    series.timestamps(false, true);
  });
  await knex.schema.createTable("pieces", (pieces) => {
    pieces.increments("piece_id");
    pieces.string("name").notNullable();
    pieces.string("description", 10000).notNullable;
    pieces
      .integer()
      .unsigned()
      .notNullable()
      .references("category_id")
      .inTable("categories")
      .onDelete("CASCADE");
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('pieces')
  await knex.schema.dropTableIfExists("series");
  await knex.schema.dropTableIfExists("categories");
  await knex.schema.dropTableIfExists("messages");
  await knex.schema.dropTableIfExists("users");
};
