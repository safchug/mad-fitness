--
-- PostgreSQL database dump
--

-- Dumped from database version 13.2 (Debian 13.2-1.pgdg100+1)
-- Dumped by pg_dump version 13.2 (Ubuntu 13.2-1.pgdg18.04+1)

-- Started on 2021-03-23 15:33:18 EET

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 209 (class 1259 OID 18538)
-- Name: classes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.classes (
    id integer NOT NULL,
    label character varying,
    description character varying,
    max_persons integer,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.classes OWNER TO postgres;

--
-- TOC entry 208 (class 1259 OID 18536)
-- Name: classes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.classes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.classes_id_seq OWNER TO postgres;

--
-- TOC entry 3036 (class 0 OID 0)
-- Dependencies: 208
-- Name: classes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.classes_id_seq OWNED BY public.classes.id;


--
-- TOC entry 207 (class 1259 OID 18527)
-- Name: invites; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.invites (
    id integer NOT NULL,
    invite uuid DEFAULT gen_random_uuid() NOT NULL,
    created_at timestamp without time zone,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    expires_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.invites OWNER TO postgres;

--
-- TOC entry 206 (class 1259 OID 18525)
-- Name: invites_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.invites_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.invites_id_seq OWNER TO postgres;

--
-- TOC entry 3037 (class 0 OID 0)
-- Dependencies: 206
-- Name: invites_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.invites_id_seq OWNED BY public.invites.id;


--
-- TOC entry 203 (class 1259 OID 18504)
-- Name: refresh_tokens; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.refresh_tokens (
    id integer NOT NULL,
    user_id integer,
    token character varying,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.refresh_tokens OWNER TO postgres;

--
-- TOC entry 202 (class 1259 OID 18502)
-- Name: refresh_tokens_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.refresh_tokens_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.refresh_tokens_id_seq OWNER TO postgres;

--
-- TOC entry 3038 (class 0 OID 0)
-- Dependencies: 202
-- Name: refresh_tokens_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.refresh_tokens_id_seq OWNED BY public.refresh_tokens.id;


--
-- TOC entry 215 (class 1259 OID 18576)
-- Name: roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.roles (
    id integer NOT NULL,
    role character varying,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.roles OWNER TO postgres;

--
-- TOC entry 214 (class 1259 OID 18574)
-- Name: roles_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.roles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.roles_id_seq OWNER TO postgres;

--
-- TOC entry 3039 (class 0 OID 0)
-- Dependencies: 214
-- Name: roles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.roles_id_seq OWNED BY public.roles.id;


--
-- TOC entry 211 (class 1259 OID 18551)
-- Name: schedule; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.schedule (
    id integer NOT NULL,
    description character varying,
    class_id integer,
    trainer_id integer,
    location character varying,
    start_date timestamp without time zone,
    end_date timestamp without time zone,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.schedule OWNER TO postgres;

--
-- TOC entry 210 (class 1259 OID 18549)
-- Name: schedule_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.schedule_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.schedule_id_seq OWNER TO postgres;

--
-- TOC entry 3040 (class 0 OID 0)
-- Dependencies: 210
-- Name: schedule_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.schedule_id_seq OWNED BY public.schedule.id;


--
-- TOC entry 213 (class 1259 OID 18564)
-- Name: schedule_users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.schedule_users (
    id integer NOT NULL,
    user_id integer,
    schedule_id integer,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.schedule_users OWNER TO postgres;

--
-- TOC entry 212 (class 1259 OID 18562)
-- Name: schedule_users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.schedule_users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.schedule_users_id_seq OWNER TO postgres;

--
-- TOC entry 3041 (class 0 OID 0)
-- Dependencies: 212
-- Name: schedule_users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.schedule_users_id_seq OWNED BY public.schedule_users.id;


--
-- TOC entry 201 (class 1259 OID 18491)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying,
    password character varying,
    role_id integer,
    email character varying,
    fullname character varying,
    active boolean,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 200 (class 1259 OID 18489)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- TOC entry 3042 (class 0 OID 0)
-- Dependencies: 200
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 205 (class 1259 OID 18517)
-- Name: users_invites; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users_invites (
    id integer NOT NULL,
    invite_id integer,
    user_id integer,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.users_invites OWNER TO postgres;

--
-- TOC entry 204 (class 1259 OID 18515)
-- Name: users_invites_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_invites_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_invites_id_seq OWNER TO postgres;

--
-- TOC entry 3043 (class 0 OID 0)
-- Dependencies: 204
-- Name: users_invites_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_invites_id_seq OWNED BY public.users_invites.id;


--
-- TOC entry 2863 (class 2604 OID 18541)
-- Name: classes id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.classes ALTER COLUMN id SET DEFAULT nextval('public.classes_id_seq'::regclass);


--
-- TOC entry 2859 (class 2604 OID 18530)
-- Name: invites id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.invites ALTER COLUMN id SET DEFAULT nextval('public.invites_id_seq'::regclass);


--
-- TOC entry 2853 (class 2604 OID 18507)
-- Name: refresh_tokens id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.refresh_tokens ALTER COLUMN id SET DEFAULT nextval('public.refresh_tokens_id_seq'::regclass);


--
-- TOC entry 2872 (class 2604 OID 18579)
-- Name: roles id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles ALTER COLUMN id SET DEFAULT nextval('public.roles_id_seq'::regclass);


--
-- TOC entry 2866 (class 2604 OID 18554)
-- Name: schedule id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.schedule ALTER COLUMN id SET DEFAULT nextval('public.schedule_id_seq'::regclass);


--
-- TOC entry 2869 (class 2604 OID 18567)
-- Name: schedule_users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.schedule_users ALTER COLUMN id SET DEFAULT nextval('public.schedule_users_id_seq'::regclass);


--
-- TOC entry 2850 (class 2604 OID 18494)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 2856 (class 2604 OID 18520)
-- Name: users_invites id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_invites ALTER COLUMN id SET DEFAULT nextval('public.users_invites_id_seq'::regclass);


--
-- TOC entry 2884 (class 2606 OID 18548)
-- Name: classes classes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.classes
    ADD CONSTRAINT classes_pkey PRIMARY KEY (id);


--
-- TOC entry 2882 (class 2606 OID 18535)
-- Name: invites invites_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.invites
    ADD CONSTRAINT invites_pkey PRIMARY KEY (id);


--
-- TOC entry 2878 (class 2606 OID 18514)
-- Name: refresh_tokens refresh_tokens_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.refresh_tokens
    ADD CONSTRAINT refresh_tokens_pkey PRIMARY KEY (id);


--
-- TOC entry 2892 (class 2606 OID 18586)
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);


--
-- TOC entry 2886 (class 2606 OID 18561)
-- Name: schedule schedule_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.schedule
    ADD CONSTRAINT schedule_pkey PRIMARY KEY (id);


--
-- TOC entry 2888 (class 2606 OID 18571)
-- Name: schedule_users schedule_users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.schedule_users
    ADD CONSTRAINT schedule_users_pkey PRIMARY KEY (id);


--
-- TOC entry 2890 (class 2606 OID 18573)
-- Name: schedule_users schedule_users_user_id_schedule_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.schedule_users
    ADD CONSTRAINT schedule_users_user_id_schedule_id_key UNIQUE (user_id, schedule_id);


--
-- TOC entry 2880 (class 2606 OID 18524)
-- Name: users_invites users_invites_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_invites
    ADD CONSTRAINT users_invites_pkey PRIMARY KEY (id);


--
-- TOC entry 2876 (class 2606 OID 18501)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 2894 (class 2606 OID 18592)
-- Name: refresh_tokens refresh_tokens_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.refresh_tokens
    ADD CONSTRAINT refresh_tokens_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- TOC entry 2897 (class 2606 OID 18607)
-- Name: schedule schedule_class_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.schedule
    ADD CONSTRAINT schedule_class_id_fkey FOREIGN KEY (class_id) REFERENCES public.classes(id);


--
-- TOC entry 2898 (class 2606 OID 18612)
-- Name: schedule schedule_trainer_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.schedule
    ADD CONSTRAINT schedule_trainer_id_fkey FOREIGN KEY (trainer_id) REFERENCES public.users(id);


--
-- TOC entry 2900 (class 2606 OID 18622)
-- Name: schedule_users schedule_users_schedule_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.schedule_users
    ADD CONSTRAINT schedule_users_schedule_id_fkey FOREIGN KEY (schedule_id) REFERENCES public.schedule(id);


--
-- TOC entry 2899 (class 2606 OID 18617)
-- Name: schedule_users schedule_users_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.schedule_users
    ADD CONSTRAINT schedule_users_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- TOC entry 2895 (class 2606 OID 18597)
-- Name: users_invites users_invites_invite_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_invites
    ADD CONSTRAINT users_invites_invite_id_fkey FOREIGN KEY (invite_id) REFERENCES public.invites(id);


--
-- TOC entry 2896 (class 2606 OID 18602)
-- Name: users_invites users_invites_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_invites
    ADD CONSTRAINT users_invites_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- TOC entry 2893 (class 2606 OID 18587)
-- Name: users users_role_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_role_id_fkey FOREIGN KEY (role_id) REFERENCES public.roles(id);


-- Completed on 2021-03-23 15:33:18 EET

--
-- PostgreSQL database dump complete
--
--

INSERT INTO public.roles (role) VALUES ('admin'), ('trainer'), ('user');
