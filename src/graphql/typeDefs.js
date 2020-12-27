"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
const apollo_server_express_1 = require("apollo-server-express");
exports.typeDefs = apollo_server_express_1.gql `
	enum ListingType {
		CAR
		SUV
		VAN
		MINIVAN
		TRUCK
	}
	enum ListingEnergy {
		GAS
		DIESEL
		ELECTRIC
		HYBRID
	}
	enum ListingsFilter {
		PRICE_LOW_TO_HIGH
		PRICE_HIGH_TO_LOW
	}

	type Viewer {
		id: ID
		token: String
		avatar: String
		hasWallet: Boolean
		didRequest: Boolean!
	}

	type Listing {
		id: ID!
		title: String!
		description: String!
		guidelines: String
		image: String!
		host: User!
		type: ListingType!
		energy: ListingEnergy!
		country: String!
		admin: String!
		address: String!
		city: String!
		bookings(limit: Int!, page: Int!): Bookings
		bookingsIndex: String!
		price: Int!
		milesPerGallon: Int
		numOfSeats: Int!
		numOfDoors: Int
	}

	type Listings {
		region: String
		total: Int!
		result: [Listing!]!
	}

	type Booking {
		id: ID!
		listing: Listing!
		renter: User!
		checkIn: String!
		checkOut: String!
	}

	type Bookings {
		total: Int!
		result: [Booking!]!
	}

	type User {
		id: ID!
		name: String!
		avatar: String!
		contact: String!
		hasWallet: Boolean!
		income: Int
		bookings(limit: Int!, page: Int!): Bookings
		listings(limit: Int!, page: Int!): Listings!
	}

	type Query {
		authUrl: String!
		user(id: ID!): User!
		listing(id: ID!): Listing!
		listings(
			location: String
			filter: ListingsFilter!
			limit: Int!
			page: Int!
		): Listings!
	}

	input LogInInput {
		code: String!
	}

	input ConnectStripeInput {
		code: String!
	}

	input HostListingInput {
		title: String!
		description: String!
		guidelines: String
		image: String!
		type: ListingType!
		energy: ListingEnergy!
		address: String!
		country: String!
		price: Int!
		milesPerGallon: Int
		numOfSeats: Int!
		numOfDoors: Int
	}

	input CreateBookingInput {
		id: ID!
		source: String!
		checkIn: String!
		checkOut: String!
	}

	type Mutation {
		logIn(input: LogInInput): Viewer!
		logOut: Viewer!
		connectStripe(input: ConnectStripeInput!): Viewer!
		disconnectStripe: Viewer!
		hostListing(input: HostListingInput!): Listing!
		createBooking(input: CreateBookingInput!): Booking!
	}
`;
