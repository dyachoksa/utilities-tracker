CREATE TABLE "meter_readings" (
	"id" uuid PRIMARY KEY NOT NULL,
	"provider_id" uuid NOT NULL,
	"tariff_zone_id" uuid NOT NULL,
	"previous_value" integer NOT NULL,
	"current_value" integer NOT NULL,
	"description" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "payments" (
	"id" uuid PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"household_id" uuid NOT NULL,
	"provider_id" uuid NOT NULL,
	"tariff_id" uuid NOT NULL,
	"amount" numeric(10, 2) NOT NULL,
	"paid_amount" numeric(10, 2) NOT NULL,
	"payment_period" date NOT NULL,
	"description" text,
	"is_paid" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "meter_readings" ADD CONSTRAINT "meter_readings_provider_id_providers_id_fk" FOREIGN KEY ("provider_id") REFERENCES "public"."providers"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "meter_readings" ADD CONSTRAINT "meter_readings_tariff_zone_id_tariff_zones_id_fk" FOREIGN KEY ("tariff_zone_id") REFERENCES "public"."tariff_zones"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payments" ADD CONSTRAINT "payments_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payments" ADD CONSTRAINT "payments_household_id_households_id_fk" FOREIGN KEY ("household_id") REFERENCES "public"."households"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payments" ADD CONSTRAINT "payments_provider_id_providers_id_fk" FOREIGN KEY ("provider_id") REFERENCES "public"."providers"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payments" ADD CONSTRAINT "payments_tariff_id_tariffs_id_fk" FOREIGN KEY ("tariff_id") REFERENCES "public"."tariffs"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "idx_meter_readings_provider_id" ON "meter_readings" USING btree ("provider_id");--> statement-breakpoint
CREATE INDEX "idx_meter_readings_tariff_zone_id" ON "meter_readings" USING btree ("tariff_zone_id");--> statement-breakpoint
CREATE INDEX "idx_meter_readings_by_date" ON "meter_readings" USING btree ("created_at" DESC NULLS LAST);--> statement-breakpoint
CREATE INDEX "idx_payments_user_id" ON "payments" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "idx_payments_household_id" ON "payments" USING btree ("household_id");--> statement-breakpoint
CREATE INDEX "idx_payments_provider_id" ON "payments" USING btree ("provider_id");--> statement-breakpoint
CREATE INDEX "idx_payments_tariff_id" ON "payments" USING btree ("tariff_id");--> statement-breakpoint
CREATE INDEX "idx_payments_by_date" ON "payments" USING btree ("payment_period" DESC NULLS LAST,"created_at");