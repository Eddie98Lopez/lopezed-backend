exports.up = async (knex) => {
    await knex.schema.createTable("images", (images) => {
      images.increments("image_id");
      images.string("image_title").notNullable();
      images.string("image_url", 2000).notNullable();
      images.timestamps(false, true);
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
    await knex.schema.createTable("projects", (project) => {
      project.increments("project_id");
      project.string("title").notNullable();
      project.string("description", 10000);
      project
        .string('cover_id').notNullable();
      project
        .integer("category_id")
        .unsigned()
        .notNullable()
        .references("category_id")
        .inTable("categories")
        .onDelete("CASCADE");
      project.integer("year").unsigned().notNullable();
      project.boolean("wip").defaultTo(true);
      project.timestamps(false, true);
    });
    await knex.schema.createTable("external_links", (links) => {
      links.increments("link_id");
      links.string("link_type").notNullable();
      links.string("link").notNullable();
      links
        .integer("project_id")
        .unsigned()
        .references("project_id")
        .inTable("projects")
        .onDelete("CASCADE")
        .notNullable();
    });
  };
  
  exports.down = async (knex) => {
    await knex.schema.dropTableIfExists('external_links')
    await knex.schema.dropTableIfExists("projects");
    await knex.schema.dropTableIfExists("collection");
    await knex.schema.dropTableIfExists("categories");
    await knex.schema.dropTableIfExists("images");

  };
  