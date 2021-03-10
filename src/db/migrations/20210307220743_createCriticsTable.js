exports.up = function (knex) {
    // Creates a table named critics when up function is called
    return knex.schema.createTable("critics", (table) => {
      table.increments("critic_id").primary();
      table.string("preferred_name");
      table.string("surname");
      table.string("organization_name");
      table.timestamps(true, true);
    });
  };
  
  exports.down = function (knex) {
      return knex.schema.dropTable("critics");
  };
