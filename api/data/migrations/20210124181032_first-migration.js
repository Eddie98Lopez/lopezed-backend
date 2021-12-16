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
    messages.string("message",100000).notNullable();
    messages.timestamps(false, true);
  });
  await knex.schema.createTable("categories", (categories) => {
    categories.increments("category_id");
    categories.string("category").notNullable();
  });
  await knex.schema.createTable("collection", (collection) => {
    collection.increments("collection_id");
    collection.string("collection").notNullable();
    collection.string("collection_description", 10000);
    collection.string("cover_photo");
    collection.timestamps(false, true);
  });
  await knex.schema.createTable("project", (project) => {
    project.increments("piece_id");
    project.string("title").notNullable();
    project.string("description", 10000).notNullable;
    project
    .integer("category_id")
    .unsigned()
    .notNullable()
    .references("category_id")
    .inTable("categories")
    .onDelete("CASCADE");
    project.integer('year').unsigned().notNullable()
    project.boolean('wip').defaultTo(true)
    project.timestamps(false,true);
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists("project");
  await knex.schema.dropTableIfExists("collection");
  await knex.schema.dropTableIfExists("categories");
  await knex.schema.dropTableIfExists("messages");
  await knex.schema.dropTableIfExists("users");
};
