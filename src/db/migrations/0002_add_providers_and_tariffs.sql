CREATE TYPE "public"."provider_type" AS ENUM('natural_gas', 'electricity', 'water', 'heating', 'maintenance', 'other');--> statement-breakpoint
CREATE TYPE "public"."tariff_type" AS ENUM('counter-based', 'fixed-rate', 'area-based');--> statement-breakpoint
CREATE TABLE "providers" (
	"id" uuid PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"household_id" uuid NOT NULL,
	"provider_type" "provider_type" NOT NULL,
	"name" text NOT NULL,
	"account_number" text,
	"website_url" text,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tariff_zones" (
	"id" uuid PRIMARY KEY NOT NULL,
	"tariff_id" uuid NOT NULL,
	"name" text NOT NULL,
	"price" numeric(10, 2) NOT NULL,
	"description" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tariffs" (
	"id" uuid PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"provider_id" uuid NOT NULL,
	"tariff_type" "tariff_type" DEFAULT 'counter-based' NOT NULL,
	"name" text NOT NULL,
	"start_date" date NOT NULL,
	"description" text,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "providers" ADD CONSTRAINT "providers_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "providers" ADD CONSTRAINT "providers_household_id_households_id_fk" FOREIGN KEY ("household_id") REFERENCES "public"."households"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tariff_zones" ADD CONSTRAINT "tariff_zones_tariff_id_tariffs_id_fk" FOREIGN KEY ("tariff_id") REFERENCES "public"."tariffs"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tariffs" ADD CONSTRAINT "tariffs_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tariffs" ADD CONSTRAINT "tariffs_provider_id_providers_id_fk" FOREIGN KEY ("provider_id") REFERENCES "public"."providers"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "idx_providers_user_id" ON "providers" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "idx_providers_household_id" ON "providers" USING btree ("household_id");--> statement-breakpoint
CREATE INDEX "idx_tariff_zones_tariff_id" ON "tariff_zones" USING btree ("tariff_id");--> statement-breakpoint
CREATE INDEX "idx_tariffs_user_id" ON "tariffs" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "idx_tariffs_provider_by_date" ON "tariffs" USING btree ("provider_id","start_date");