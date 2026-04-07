
import { int, mysqlTable, serial, varchar } from 'drizzle-orm/mysql-core';

export const usersTable = mysqlTable('users_table', {
  id: int('id').primaryKey().autoincrement(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({length:255}),
  sessionID: varchar({length:255})
});

export const heroTable = mysqlTable('hero_table',{
  id: int('id').primaryKey().autoincrement(),
  name: varchar({length:255}).notNull(),
  imageName: varchar({length:255}),
  description: varchar({length:500}),
  role: varchar({length:255})
});

export const abilityTable = mysqlTable('ability_table',{
  id: int('id').primaryKey().autoincrement(),
  heroID: int('heroID').references(()=> heroTable.id, {onDelete: 'cascade'}).notNull(),
  name: varchar({length:255}),
  description: varchar({length:500})
});

export const passivesTable = mysqlTable('passives_table',{
  id: int('id').primaryKey().autoincrement(),
  name: varchar({length:255}),
  description: varchar({length:500})
})

export const passivesHeroJunction = mysqlTable('passiveHeroJunction_table',{
  id: int('id').primaryKey().autoincrement(),
  heroID: int('heroID').references(()=>heroTable.id,{onDelete:'cascade'}).notNull(),
  passiveID: int('passiveID').references(()=>passivesTable.id,{onDelete:'cascade'})
})

export const countersTable = mysqlTable('counters_table',{
  id: int('id').primaryKey().autoincrement(),
  heroID: int('heroID').references(()=> heroTable.id, {onDelete: 'cascade'}).notNull(),
  heroCounterID: int('heroCounterID').references(()=> heroTable.id,{onDelete: 'cascade'}),
  reason: varchar({length:500})
})

export const ultimatesTable = mysqlTable('ultimates_table',{
  id: int('id').primaryKey().autoincrement(),
  heroID: int('heroID').references(()=>heroTable.id,{onDelete: 'cascade'}).notNull(),
  name: varchar({length:255}),
  description: varchar({length:500})
})

export const weaponsTable = mysqlTable('weapons_table',{
  id: int('id').primaryKey().autoincrement(),
  heroID: int('heroID').references(()=>heroTable.id,{onDelete:'cascade'}).notNull(),
  name: varchar({length:255}),
  description: varchar({length:500})
})