import { pgTable, serial, text, boolean, integer, timestamp, real } from "drizzle-orm/pg-core";

export const movies = pgTable("movies", {
	ID: serial('ID').primaryKey(),
	movie_id: text("movie_id").primaryKey(),
	title: text("title").notNull(),
	director: text("director").notNull(),
	genre: text("genre").notNull(),
	duration: real("duration").notNull(),
	release_date: timestamp("release_date").notNull(),
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
	theater_id: text("theater_id").primaryKey(),
	name: text("name").notNull(),
	address: text("address").notNull(),
	city: text("city").notNull(),
	capacity: integer("capacity").notNull(),
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
	showtime_id: text("showtime_id").primaryKey(),
	movie_id: text("movie_id")
		.notNull()
		.references(() => movies.movie_id),
	theater_id: text("theater_id")
		.notNull()
		.references(() => theaters.theater_id),
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
	seat_id: text("seat_id").primaryKey(),
	theater_id: text("theater_id")
		.notNull()
		.references(() => theaters.theater_id),
	seat_number: text("seat_number").notNull(),
	row_number: text("row_number").notNull(),
	is_booked: boolean("is_booked").notNull(),
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
	customer_id: text("customer_id").primaryKey(),
	name: text("name").notNull(),
	email: text("email").notNull(),
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
	booking_id: text("booking_id").primaryKey(),
	customer_id: text("customer_id")
		.notNull()
		.references(() => customers.customer_id),
	showtime_id: text("showtime_id")
		.notNull()
		.references(() => showtimes.showtime_id),
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
	city_id: text("city_id").primaryKey(),
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
	city_cinema_id: text("city_cinema_id").primaryKey(),
	city_id: text("city_id")
		.notNull()
		.references(() => cities.city_id),
	theater_id: text("theater_id")
		.notNull()
		.references(() => theaters.theater_id),
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
	auditorium_id: text("auditorium_id").primaryKey(),
	theater_id: text("theater_id")
		.notNull()
		.references(() => theaters.theater_id),
	name: text("name").notNull(),
	capacity: integer("capacity").notNull(),
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
	payment_id: text("payment_id").primaryKey(),
	booking_id: text("booking_id")
		.notNull()
		.references(() => bookings.booking_id),
	amount: real("amount").notNull(),
	payment_method_id: text("payment_method_id")
		.notNull()
		.references(() => payment_methods.method_id),
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
	method_id: text("method_id").primaryKey(),
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