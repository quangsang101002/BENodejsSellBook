use `rikkei_academy`;
create table `users` (
`id` int auto_increment primary key,
`username` varchar(20) not null,
`email` varchar(100) not null,
`password` varchar(255) not null,
`firt_name` varchar(50),
`last_name` varchar(50),
`role` tinyint(1),
`avatar` varchar(255),
`create_at` datetime,
`create_by` int,
`update_at` datetime,
`update_by` int
);

