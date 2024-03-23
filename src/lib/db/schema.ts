import { pgTable, serial, text, boolean, integer, timestamp, real } from "drizzle-orm/pg-core";

export const movies = pgTable("movies", {
	id: serial('id').primaryKey(),
	title: text("title").notNull(),
	director: text("director"),
	genre: text("genre"),
	img: text("img"),
	duration: real("duration"),
	release_date: timestamp("release_date"),
	created_at: timestamp('created_at', {
		precision: 6,
		withTimezone: true,
	}).defaultNow(),
	updated_at: timestamp('updated_at', {
		precision: 6,
		withTimezone: true,
	}).defaultNow(),
});

export const theaters = pgTable("theaters", {
	id: serial('id').primaryKey(),
	name: text("name").notNull(),
	address: text("address"),
	city: text("city"),
	capacity: integer("capacity"),
	created_at: timestamp('created_at', {
		precision: 6,
		withTimezone: true,
	}).defaultNow(),
	updated_at: timestamp('updated_at', {
		precision: 6,
		withTimezone: true,
	}).defaultNow(),
});

export const showtimes = pgTable("showtimes", {
	id: serial('id').primaryKey(),
	movie_id: integer("movie_id")
		.notNull()
		.references(() => movies.id),
	theater_id: integer("theater_id")
		.notNull()
		.references(() => theaters.id),
	start_time: timestamp("start_time").notNull(),
	end_time: timestamp("end_time").notNull(),
	created_at: timestamp('created_at', {
		precision: 6,
		withTimezone: true,
	}).defaultNow(),
	updated_at: timestamp('updated_at', {
		precision: 6,
		withTimezone: true,
	}).defaultNow(),
});

export const seats = pgTable("seats", {
	id: serial('id').primaryKey(),
	theater_id: integer("theater_id")
		.notNull()
		.references(() => theaters.id),
	seat_number: text("seat_number").notNull(),
	row_number: text("row_number").notNull(),
	is_ghost: boolean("is_ghost"),
	created_at: timestamp('created_at', {
		precision: 6,
		withTimezone: true,
	}).defaultNow(),
	updated_at: timestamp('updated_at', {
		precision: 6,
		withTimezone: true,
	}).defaultNow(),
});

export const customers = pgTable("customers", {
	id: serial('id').primaryKey(),
	name: text("name"),
	email: text("email"),
	phone: text("phone").notNull(),
	created_at: timestamp('created_at', {
		precision: 6,
		withTimezone: true,
	}).defaultNow(),
	updated_at: timestamp('updated_at', {
		precision: 6,
		withTimezone: true,
	}).defaultNow(),
});

export const bookings = pgTable("bookings", {
	id: serial('id').primaryKey(),
	customer_id: integer("customer_id")
		.notNull()
		.references(() => customers.id),
	showtime_id: integer("showtime_id")
		.notNull()
		.references(() => showtimes.id),
	number_of_tickets: integer("number_of_tickets").notNull(),
	total_price: real("total_price").notNull(),
	booking_time: timestamp("booking_time").notNull(),
	created_at: timestamp('created_at', {
		precision: 6,
		withTimezone: true,
	}).defaultNow(),
	updated_at: timestamp('updated_at', {
		precision: 6,
		withTimezone: true,
	}).defaultNow(),
});

export const cities = pgTable("cities", {
	id: serial('id').primaryKey(),
	name: text("name").notNull(),
	created_at: timestamp('created_at', {
		precision: 6,
		withTimezone: true,
	}).defaultNow(),
	updated_at: timestamp('updated_at', {
		precision: 6,
		withTimezone: true,
	}).defaultNow(),
});

export const city_cinemas = pgTable("city_cinemas", {
	id: serial('id').primaryKey(),
	city_id: integer("city_id")
		.notNull()
		.references(() => cities.id),
	theater_id: integer("theater_id")
		.notNull()
		.references(() => theaters.id),
	created_at: timestamp('created_at', {
		precision: 6,
		withTimezone: true,
	}).defaultNow(),
	updated_at: timestamp('updated_at', {
		precision: 6,
		withTimezone: true,
	}).defaultNow(),
});

export const auditoriums = pgTable("auditoriums", {
	id: serial('id').primaryKey(),
	theater_id: integer("theater_id")
		.notNull()
		.references(() => theaters.id),
	name: text("name").notNull(),
	capacity: integer("capacity"),
	created_at: timestamp('created_at', {
		precision: 6,
		withTimezone: true,
	}).defaultNow(),
	updated_at: timestamp('updated_at', {
		precision: 6,
		withTimezone: true,
	}).defaultNow(),
});

export const payments = pgTable("payments", {
	id: serial('id').primaryKey(),
	booking_id: integer("booking_id")
		.notNull()
		.references(() => bookings.id),
	amount: real("amount").notNull(),
	payment_method_id: integer("payment_method_id")
		.notNull()
		.references(() => payment_methods.id),
	payment_time: timestamp("payment_time").notNull(),
	created_at: timestamp('created_at', {
		precision: 6,
		withTimezone: true,
	}).defaultNow(),
	updated_at: timestamp('updated_at', {
		precision: 6,
		withTimezone: true,
	}).defaultNow(),
});

export const payment_methods = pgTable("payment_methods", {
	id: serial('id').primaryKey(),
	name: text("name").notNull(),
	created_at: timestamp('created_at', {
		precision: 6,
		withTimezone: true,
	}).defaultNow(),
	updated_at: timestamp('updated_at', {
		precision: 6,
		withTimezone: true,
	}).defaultNow(),
});