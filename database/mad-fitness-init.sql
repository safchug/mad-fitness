--
-- PostgreSQL database dump
--

-- Dumped from database version 13.2 (Debian 13.2-1.pgdg100+1)
-- Dumped by pg_dump version 13.2 (Ubuntu 13.2-1.pgdg18.04+1)

-- Started on 2021-03-28 11:10:25 EEST

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

--
-- TOC entry 2 (class 3079 OID 16523)
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- TOC entry 3066 (class 0 OID 0)
-- Dependencies: 2
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner:
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 201 (class 1259 OID 16385)
-- Name: classes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.classes (
    id integer NOT NULL,
    label character varying NOT NULL,
    description character varying,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP(6) NOT NULL,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP(6) NOT NULL,
    max_person integer NOT NULL
);


ALTER TABLE public.classes OWNER TO postgres;

--
-- TOC entry 202 (class 1259 OID 16393)
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
-- TOC entry 3067 (class 0 OID 0)
-- Dependencies: 202
-- Name: classes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.classes_id_seq OWNED BY public.classes.id;


--
-- TOC entry 203 (class 1259 OID 16395)
-- Name: invites; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.invites (
    id integer NOT NULL,
    invite uuid DEFAULT gen_random_uuid() NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP(6) NOT NULL,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP(6) NOT NULL,
    expires_at timestamp without time zone DEFAULT (now() + '06:00:00'::interval) NOT NULL
);


ALTER TABLE public.invites OWNER TO postgres;

--
-- TOC entry 204 (class 1259 OID 16401)
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
-- TOC entry 3068 (class 0 OID 0)
-- Dependencies: 204
-- Name: invites_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.invites_id_seq OWNED BY public.invites.id;


--
-- TOC entry 205 (class 1259 OID 16403)
-- Name: refresh_tokens; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.refresh_tokens (
    id integer NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP(6) NOT NULL,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP(6) NOT NULL,
    "userId" integer,
    token character varying(255) NOT NULL
);


ALTER TABLE public.refresh_tokens OWNER TO postgres;

--
-- TOC entry 206 (class 1259 OID 16411)
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
-- TOC entry 3069 (class 0 OID 0)
-- Dependencies: 206
-- Name: refresh_tokens_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.refresh_tokens_id_seq OWNED BY public.refresh_tokens.id;


--
-- TOC entry 207 (class 1259 OID 16413)
-- Name: roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.roles (
    id integer NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP(6) NOT NULL,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP(6) NOT NULL,
    role character varying(50) NOT NULL
);


ALTER TABLE public.roles OWNER TO postgres;

--
-- TOC entry 208 (class 1259 OID 16421)
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
-- TOC entry 3070 (class 0 OID 0)
-- Dependencies: 208
-- Name: roles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.roles_id_seq OWNED BY public.roles.id;


--
-- TOC entry 209 (class 1259 OID 16423)
-- Name: schedule; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.schedule (
    id integer NOT NULL,
    description character varying NOT NULL,
    location character varying NOT NULL,
    start_date timestamp without time zone DEFAULT now() NOT NULL,
    end_date timestamp without time zone NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP(6) NOT NULL,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP(6) NOT NULL,
    "trainerId" integer,
    "classId" integer
);


ALTER TABLE public.schedule OWNER TO postgres;

--
-- TOC entry 210 (class 1259 OID 16431)
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
-- TOC entry 3071 (class 0 OID 0)
-- Dependencies: 210
-- Name: schedule_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.schedule_id_seq OWNED BY public.schedule.id;


--
-- TOC entry 211 (class 1259 OID 16433)
-- Name: schedule_users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.schedule_users (
    id integer NOT NULL,
    user_id integer,
    schedule_id integer,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.schedule_users OWNER TO postgres;

--
-- TOC entry 212 (class 1259 OID 16438)
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
-- TOC entry 3072 (class 0 OID 0)
-- Dependencies: 212
-- Name: schedule_users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.schedule_users_id_seq OWNED BY public.schedule_users.id;


--
-- TOC entry 213 (class 1259 OID 16440)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
<<<<<<< HEAD
    "roleId" integer,
    active boolean DEFAULT true NOT NULL,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now(),
    first_name character varying(100) NOT NULL,
    password character varying(100) NOT NULL,
    email character varying(100) NOT NULL,
    last_name character varying(100) NOT NULL
=======
    first_name character varying,
    password character varying,
    role_id integer,
    email character varying,
    last_name character varying,
    active boolean DEFAULT false,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
>>>>>>> 4b2c84f6dbf79ff40135d214a6d309eda53e7245
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 214 (class 1259 OID 16448)
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
-- TOC entry 3073 (class 0 OID 0)
-- Dependencies: 214
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 215 (class 1259 OID 16450)
-- Name: users_invites; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users_invites (
    id integer NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP(6) NOT NULL,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP(6) NOT NULL,
    "userId" integer,
    "inviteId" integer
);


ALTER TABLE public.users_invites OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 16455)
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
-- TOC entry 3074 (class 0 OID 0)
-- Dependencies: 216
-- Name: users_invites_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_invites_id_seq OWNED BY public.users_invites.id;


--
-- TOC entry 2861 (class 2604 OID 16457)
-- Name: classes id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.classes ALTER COLUMN id SET DEFAULT nextval('public.classes_id_seq'::regclass);


--
-- TOC entry 2865 (class 2604 OID 16458)
-- Name: invites id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.invites ALTER COLUMN id SET DEFAULT nextval('public.invites_id_seq'::regclass);


--
-- TOC entry 2869 (class 2604 OID 16459)
-- Name: refresh_tokens id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.refresh_tokens ALTER COLUMN id SET DEFAULT nextval('public.refresh_tokens_id_seq'::regclass);


--
-- TOC entry 2872 (class 2604 OID 16460)
-- Name: roles id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles ALTER COLUMN id SET DEFAULT nextval('public.roles_id_seq'::regclass);


--
-- TOC entry 2875 (class 2604 OID 16461)
-- Name: schedule id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.schedule ALTER COLUMN id SET DEFAULT nextval('public.schedule_id_seq'::regclass);


--
-- TOC entry 2879 (class 2604 OID 16462)
-- Name: schedule_users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.schedule_users ALTER COLUMN id SET DEFAULT nextval('public.schedule_users_id_seq'::regclass);


--
-- TOC entry 2882 (class 2604 OID 16463)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 2886 (class 2604 OID 16464)
-- Name: users_invites id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_invites ALTER COLUMN id SET DEFAULT nextval('public.users_invites_id_seq'::regclass);


--
-- TOC entry 3045 (class 0 OID 16385)
-- Dependencies: 201
-- Data for Name: classes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.classes (id, label, description, created_at, updated_at, max_person) FROM stdin;
\.


--
-- TOC entry 3047 (class 0 OID 16395)
-- Dependencies: 203
-- Data for Name: invites; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.invites (id, invite, created_at, updated_at, expires_at) FROM stdin;
12	2ca3c750-c62a-4408-a920-5b7a3dd922ed	2021-03-26 18:14:22.93808	2021-03-26 18:14:22.93808	2021-03-27 00:14:22.93808
13	dcfafe30-2596-47d4-8672-e1bad0f86792	2021-03-26 18:18:59.884315	2021-03-26 18:18:59.884315	2021-03-27 00:18:59.884315
14	0f12ad11-f609-4e61-8586-4a8c077054d1	2021-03-26 18:21:04.277637	2021-03-26 18:21:04.277637	2021-03-27 00:21:04.277637
15	19ae1f2f-6113-45b1-ac62-d0317027f076	2021-03-26 18:23:34.02149	2021-03-26 18:23:34.02149	2021-03-27 00:23:34.02149
16	72ed872b-5ee3-4da5-90de-bf17a36fbe53	2021-03-26 18:34:36.990075	2021-03-26 18:34:36.990075	2021-03-27 00:34:36.990075
17	5b23fafe-188d-44c2-b2b6-8b7eb0c8bfe6	2021-03-26 18:37:04.211791	2021-03-26 18:37:04.211791	2021-03-27 00:37:04.211791
18	d032c461-126d-418d-a04c-1d1c4ab7cc48	2021-03-26 18:44:44.172163	2021-03-26 18:44:44.172163	2021-03-27 00:44:44.172163
19	bcb31d3f-2104-4fd9-8f33-3c7b2216302a	2021-03-26 18:50:20.741528	2021-03-26 18:50:20.741528	2021-03-27 00:50:20.741528
21	4f2b6ce5-fe6c-4dc7-824d-427f985aa003	2021-03-27 10:46:15.28372	2021-03-27 10:46:15.28372	2021-03-27 16:46:15.28372
22	0b94b019-1520-482d-831f-39ec65385a16	2021-03-27 10:46:33.174878	2021-03-27 10:46:33.174878	2021-03-27 16:46:33.174878
23	bf89a3b8-70fa-4a14-8ca1-e816021a6cd7	2021-03-27 10:55:08.939817	2021-03-27 10:55:08.939817	2021-03-27 16:55:08.939817
24	c48ce1c6-2079-4f8d-9754-ef8354baa243	2021-03-27 11:13:45.230786	2021-03-27 11:13:45.230786	2021-03-27 17:13:45.230786
26	d4861bf6-c016-445f-bc45-f1e66be687d8	2021-03-27 11:20:35.311465	2021-03-27 11:20:35.311465	2021-03-27 17:20:35.311465
27	971dad71-40ee-493c-a231-34f66e851e19	2021-03-27 15:36:34.191229	2021-03-27 15:36:34.191229	2021-03-27 21:36:34.191229
28	39a9475c-0a3a-4c12-a2e8-7473ca9271b8	2021-03-27 15:39:24.050949	2021-03-27 15:39:24.050949	2021-04-03 18:39:24.07
\.


--
-- TOC entry 3049 (class 0 OID 16403)
-- Dependencies: 205
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.refresh_tokens (id, created_at, updated_at, "userId", token) FROM stdin;
\.


--
-- TOC entry 3051 (class 0 OID 16413)
-- Dependencies: 207
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.roles (id, created_at, updated_at, role) FROM stdin;
2	2021-03-27 10:46:15.28372	2021-03-27 10:46:15.28372	user
3	2021-03-27 10:46:33.174878	2021-03-27 10:46:33.174878	trainer
5	2021-03-27 11:48:56.983022	2021-03-27 11:48:56.983022	admin
\.


--
-- TOC entry 3053 (class 0 OID 16423)
-- Dependencies: 209
-- Data for Name: schedule; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.schedule (id, description, location, start_date, end_date, created_at, updated_at, "trainerId", "classId") FROM stdin;
\.


--
-- TOC entry 3055 (class 0 OID 16433)
-- Dependencies: 211
-- Data for Name: schedule_users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.schedule_users (id, user_id, schedule_id, created_at, updated_at) FROM stdin;
\.


--
-- TOC entry 3057 (class 0 OID 16440)
-- Dependencies: 213
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, "roleId", active, created_at, updated_at, first_name, password, email, last_name) FROM stdin;
8	\N	t	2021-03-26 18:14:22.93808	2021-03-26 18:14:22.93808	Vasyl	secret	safchug@gmail.com	Savchuk
9	\N	t	2021-03-26 18:18:59.884315	2021-03-26 18:18:59.884315	Vasyl	secret	safchug@gmail.com	Savchuk
10	\N	t	2021-03-26 18:21:04.277637	2021-03-26 18:21:04.277637	Vasyl	secret	safchug@gmail.com	Savchuk
11	\N	t	2021-03-26 18:23:34.02149	2021-03-26 18:23:34.02149	Vasyl	secret	safchug@gmail.com	Savchuk
12	\N	t	2021-03-26 18:34:36.990075	2021-03-26 18:34:36.990075	Vasyl	secret	safchug@gmail.com	Savchuk
13	\N	t	2021-03-26 18:37:04.211791	2021-03-26 18:37:04.211791	Vasyl	secret	safchug@gmail.com	Savchuk
14	\N	t	2021-03-26 18:44:44.172163	2021-03-26 18:44:44.172163	Vasyl	secret	safchug@gmail.com	Savchuk
15	\N	t	2021-03-26 18:50:20.741528	2021-03-26 18:50:20.741528	Vasyl	secret	safchug@gmail.com	Savchuk
16	2	t	2021-03-27 10:46:15.28372	2021-03-27 10:46:15.28372	Vasyl	secret	safchug@gmail.com	Savchuk
17	3	t	2021-03-27 10:46:33.174878	2021-03-27 10:46:33.174878	Vasyl	secret	safchug@gmail.com	Savchuk
18	2	t	2021-03-27 10:55:08.939817	2021-03-27 10:55:08.939817	Vasyl	secret	safchug@gmail.com	Savchuk
19	2	t	2021-03-27 11:13:45.230786	2021-03-27 11:13:45.230786	Vasyl	secret	safchug@gmail.com	Savchuk
21	2	t	2021-03-27 11:20:35.311465	2021-03-27 11:20:35.311465	Vasyl	secret	safchug@gmail.com	Savchuk
22	2	t	2021-03-27 15:36:34.191229	2021-03-27 15:36:34.191229	Vasyl	secret	safchug@gmail.com	Savchuk
23	2	t	2021-03-27 15:39:24.050949	2021-03-27 15:39:24.050949	Vasyl	secret	safchug@gmail.com	Savchuk
\.


--
-- TOC entry 3059 (class 0 OID 16450)
-- Dependencies: 215
-- Data for Name: users_invites; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users_invites (id, created_at, updated_at, "userId", "inviteId") FROM stdin;
1	2021-03-26 18:14:22.93808	2021-03-26 18:14:22.93808	8	12
2	2021-03-26 18:18:59.884315	2021-03-26 18:18:59.884315	9	13
3	2021-03-26 18:21:04.277637	2021-03-26 18:21:04.277637	10	14
4	2021-03-26 18:23:34.02149	2021-03-26 18:23:34.02149	11	15
5	2021-03-26 18:34:36.990075	2021-03-26 18:34:36.990075	12	16
6	2021-03-26 18:37:04.211791	2021-03-26 18:37:04.211791	13	17
7	2021-03-26 18:44:44.172163	2021-03-26 18:44:44.172163	14	18
8	2021-03-26 18:50:20.741528	2021-03-26 18:50:20.741528	15	19
9	2021-03-27 10:46:15.28372	2021-03-27 10:46:15.28372	16	21
10	2021-03-27 10:46:33.174878	2021-03-27 10:46:33.174878	17	22
11	2021-03-27 10:55:08.939817	2021-03-27 10:55:08.939817	18	23
12	2021-03-27 11:13:45.230786	2021-03-27 11:13:45.230786	19	24
14	2021-03-27 11:20:35.311465	2021-03-27 11:20:35.311465	21	26
15	2021-03-27 15:36:34.191229	2021-03-27 15:36:34.191229	22	27
16	2021-03-27 15:39:24.050949	2021-03-27 15:39:24.050949	23	28
\.


--
-- TOC entry 3075 (class 0 OID 0)
-- Dependencies: 202
-- Name: classes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.classes_id_seq', 1, false);


--
-- TOC entry 3076 (class 0 OID 0)
-- Dependencies: 204
-- Name: invites_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.invites_id_seq', 28, true);


--
-- TOC entry 3077 (class 0 OID 0)
-- Dependencies: 206
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.refresh_tokens_id_seq', 1, false);


--
-- TOC entry 3078 (class 0 OID 0)
-- Dependencies: 208
-- Name: roles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.roles_id_seq', 5, true);


--
-- TOC entry 3079 (class 0 OID 0)
-- Dependencies: 210
-- Name: schedule_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.schedule_id_seq', 1, false);


--
-- TOC entry 3080 (class 0 OID 0)
-- Dependencies: 212
-- Name: schedule_users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.schedule_users_id_seq', 1, false);


--
-- TOC entry 3081 (class 0 OID 0)
-- Dependencies: 214
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 23, true);


--
-- TOC entry 3082 (class 0 OID 0)
-- Dependencies: 216
-- Name: users_invites_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_invites_id_seq', 16, true);


--
-- TOC entry 2896 (class 2606 OID 25157)
-- Name: roles UQ_ccc7c1489f3a6b3c9b47d4537c5; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT "UQ_ccc7c1489f3a6b3c9b47d4537c5" UNIQUE (role);


--
-- TOC entry 2890 (class 2606 OID 16466)
-- Name: classes classes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.classes
    ADD CONSTRAINT classes_pkey PRIMARY KEY (id);


--
-- TOC entry 2892 (class 2606 OID 16468)
-- Name: invites invites_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.invites
    ADD CONSTRAINT invites_pkey PRIMARY KEY (id);


--
-- TOC entry 2894 (class 2606 OID 16470)
-- Name: refresh_tokens refresh_tokens_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.refresh_tokens
    ADD CONSTRAINT refresh_tokens_pkey PRIMARY KEY (id);


--
-- TOC entry 2898 (class 2606 OID 16472)
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);


--
-- TOC entry 2900 (class 2606 OID 16474)
-- Name: schedule schedule_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.schedule
    ADD CONSTRAINT schedule_pkey PRIMARY KEY (id);


--
-- TOC entry 2902 (class 2606 OID 16476)
-- Name: schedule_users schedule_users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.schedule_users
    ADD CONSTRAINT schedule_users_pkey PRIMARY KEY (id);


--
-- TOC entry 2906 (class 2606 OID 16480)
-- Name: users_invites users_invites_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_invites
    ADD CONSTRAINT users_invites_pkey PRIMARY KEY (id);


--
-- TOC entry 2904 (class 2606 OID 16482)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 2909 (class 2606 OID 25191)
-- Name: schedule FK_08aac4a7aad6819197a8ba8f3e8; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.schedule
    ADD CONSTRAINT "FK_08aac4a7aad6819197a8ba8f3e8" FOREIGN KEY ("classId") REFERENCES public.classes(id);


--
-- TOC entry 2914 (class 2606 OID 25211)
-- Name: users_invites FK_0a5ae20e0b9371208693b2d83e6; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_invites
    ADD CONSTRAINT "FK_0a5ae20e0b9371208693b2d83e6" FOREIGN KEY ("inviteId") REFERENCES public.invites(id);


--
-- TOC entry 2908 (class 2606 OID 25186)
-- Name: schedule FK_349d527a10a121f1626b68d5a88; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.schedule
    ADD CONSTRAINT "FK_349d527a10a121f1626b68d5a88" FOREIGN KEY ("trainerId") REFERENCES public.users(id);


--
-- TOC entry 2912 (class 2606 OID 25224)
-- Name: users FK_368e146b785b574f42ae9e53d5e; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "FK_368e146b785b574f42ae9e53d5e" FOREIGN KEY ("roleId") REFERENCES public.roles(id);


--
-- TOC entry 2911 (class 2606 OID 25201)
-- Name: schedule_users FK_55634b72855b44903452ed75486; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.schedule_users
    ADD CONSTRAINT "FK_55634b72855b44903452ed75486" FOREIGN KEY (schedule_id) REFERENCES public.schedule(id);


--
-- TOC entry 2907 (class 2606 OID 25181)
-- Name: refresh_tokens FK_610102b60fea1455310ccd299de; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.refresh_tokens
    ADD CONSTRAINT "FK_610102b60fea1455310ccd299de" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- TOC entry 2913 (class 2606 OID 25206)
-- Name: users_invites FK_c5f7d4a68d2b4b1b23647b2e805; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_invites
    ADD CONSTRAINT "FK_c5f7d4a68d2b4b1b23647b2e805" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- TOC entry 2910 (class 2606 OID 25196)
-- Name: schedule_users FK_eef76312193002358d91ee5808d; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.schedule_users
    ADD CONSTRAINT "FK_eef76312193002358d91ee5808d" FOREIGN KEY (user_id) REFERENCES public.users(id);


-- Completed on 2021-03-28 11:10:25 EEST

--
-- PostgreSQL database dump complete
--
INSERT INTO public.roles (role) VALUES ('admin'), ('trainer'), ('user');
INSERT INTO public.users (first_name, password, role_id, email, last_name, active) VALUES ('Admin_firstname', '$2b$10$imxiCaHc4KuGZV0VJg0zge.ZsZmfalQjWnTgMUIK22yZBcB4hP4CW', 1, 'admin@madfitness.com', 'Admin_lastname', true);