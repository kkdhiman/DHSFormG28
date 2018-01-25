-- Some SQL phrases for generating the Users and Roles Tables for
-- the G28 Form System.  Also some phrases for seeding the database 
-- with some roles.

-- drop table g28formUsers;
-- drop table g28formroles cascade;

CREATE TABLE g28formUsers (
    user_id varchar(20) NOT NULL,
    password_hash varchar(200) NOT NULL,
    first_name varchar(50),
    last_name varchar(50),
    email_address varchar(50),
    salt integer,
    create_date timestamp default current_timestamp,
    update_date timestamp default current_timestamp,
    role_id integer REFERENCES g28formRoles (role_id),
    UNIQUE(user_id)
);

CREATE TABLE g28formRoles (
    role_id SERIAL NOT NULL,
    role_name varchar(30),
    role_description varchar(200),
    admin_role_secret varchar(100),
    create_date timestamp default current_timestamp,
    update_date timestamp default current_timestamp,
    UNIQUE(role_id)
);

insert into g28formroles (role_name, role_description) 
    values ('USER', 'Regular user who needs ability to submit G28 Form data');
insert into g28formroles (role_name, role_description, admin_role_secret) 
    values ('ADMIN', 'Administrative Role for the G28 system', 'xxxxx');

select *
from g28formroles;

