-- This script was generated by a beta version of the ERD tool in pgAdmin 4.
-- Please log an issue at https://redmine.postgresql.org/projects/pgadmin4/issues/new if you find any bugs, including reproduction steps.
BEGIN;

CREATE TABLE IF NOT EXISTS public."category"
(
    "categoryId" integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    "categoryName" character varying(50) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "category_pkey" PRIMARY KEY ("categoryId")
);

CREATE TABLE IF NOT EXISTS public."itemAction"
(
    "itemActionId" integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    "itemAction" character varying(30) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "itemAction_pkey" PRIMARY KEY ("itemActionId")
);

CREATE TABLE IF NOT EXISTS public."location"
(
    "locationId" integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    "locationName" character varying(50) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "location_pkey" PRIMARY KEY ("locationId")
);

CREATE TABLE IF NOT EXISTS public."shelf"
(
    "shelfId" integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    "shelfName" character varying(50) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "shelf_pkey" PRIMARY KEY ("shelfId")
);

CREATE TABLE IF NOT EXISTS public."item"
(
    "itemId" character varying(50) NOT NULL,
    "itemName" character varying(50) COLLATE pg_catalog."default" NOT NULL,
    "creationDate" date NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "categoryId" integer NOT NULL,
    CONSTRAINT "item_pkey" PRIMARY KEY ("itemId")
);

CREATE TABLE IF NOT EXISTS public."user"
(
    "userId" character varying(100) NOT NULL,
    "fullName" character varying(150) COLLATE pg_catalog."default" NOT NULL,
    "email" character varying(50) COLLATE pg_catalog."default" NOT NULL,
    "creationDate" date NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "user_pkey" PRIMARY KEY ("userId")
);

CREATE TABLE IF NOT EXISTS public."userItem"
(
    "userId" character varying(100) NOT NULL,
    "itemId" character varying(50) NOT NULL,
    "creationDate" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "quantity" integer NOT NULL DEFAULT 0,
    "expirationDate" date NOT NULL,
    "locationId" integer NOT NULL,
    "shelfId" integer NOT NULL,
    "isEssential" boolean NOT NULL DEFAULT false,
    CONSTRAINT "userItem_pk" PRIMARY KEY ("userId", "itemId", "creationDate")
);

CREATE TABLE IF NOT EXISTS public."userEssentials"
(
    "userId" character varying(100) NOT NULL,
    "itemId" character varying(50) NOT NULL,
    "creationDate" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "userEssentials_pk" PRIMARY KEY ("userId", "itemId")
);

ALTER TABLE IF EXISTS public."userEssentials"
    ADD CONSTRAINT "userId_essential_constraint" FOREIGN KEY ("userId")
    REFERENCES public."user" ("userId") MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;
    
ALTER TABLE IF EXISTS public."userEssentials"
    ADD CONSTRAINT "itemId_essential_constraint" FOREIGN KEY ("itemId")
    REFERENCES public."item" ("itemId") MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;
    

ALTER TABLE IF EXISTS public."item"
    ADD CONSTRAINT "categoryId_constraint" FOREIGN KEY ("categoryId")
    REFERENCES public."category" ("categoryId") MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public."userItem"
    ADD CONSTRAINT "locationId_constraint" FOREIGN KEY ("locationId")
    REFERENCES public."location" ("locationId") MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public."userItem"
    ADD CONSTRAINT "shelfId_constraint" FOREIGN KEY ("shelfId")
    REFERENCES public."shelf" ("shelfId") MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public."userItem"
    ADD CONSTRAINT "userId_constraint" FOREIGN KEY ("userId")
    REFERENCES public."user" ("userId") MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;

ALTER TABLE IF EXISTS public."userItem"
    ADD CONSTRAINT "itemId_constraint" FOREIGN KEY ("itemId")
    REFERENCES public."item" ("itemId") MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;

END;