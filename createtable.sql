-- Table: public.hska_exp

-- DROP TABLE public.hska_exp;

CREATE TABLE public.hska_exp
(
  "ID" integer,
  "Name" text,
  "Lon" numeric,
  "Lat" numeric,
  "Height" numeric,
  "Date" text,
  "Hour" text,
  "ODL" numeric
)
WITH (
  OIDS=FALSE
);
ALTER TABLE public.hska_exp
  OWNER TO postgres;
