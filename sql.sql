CREATE TABLE user(
	id int(11) PRIMARY KEY AUTO_INCREMENT,
	username VARCHAR(255) NULL,
	password VARCHAR(255) NULL,
	email VARCHAR(255) NULL,
	phone VARCHAR(255) NULL,
	gender TINYINT(255) NULL,
	birthday datetime NULL,
	address VARCHAR(255) NULL
);

CREATE TABLE role (
	id int(11) PRIMARY KEY AUTO_INCREMENT,
	name VARCHAR(255) NOT NULL
);

CREATE TABLE role_user (
	role_id int(11) NOT NULL,
	user_id int(11) NOT NULL,
	PRIMARY KEY (user_id, role_id)
);

CREATE TABLE resource (
	id int(11) PRIMARY KEY AUTO_INCREMENT,
	name VARCHAR(255) NOT NULL,
	parent_id int(11) NOT NULL,
	`key` VARCHAR(255) NOT NULL,
	icon VARCHAR(255) NOT NULL
);

CREATE TABLE role_resource (
	role_id int(11) NOT NULL,
	resource_id int(255) NOT NULL,
	PRIMARY KEY (role_id, resource_id)
);

INSERT INTO `role`(`id`, `name`) VALUES (1, '管理员');

INSERT INTO `resource`(`id`, `name`, `parent_id`, `key`, `icon`) VALUES (1, '全部权限', 0, '/admin', 'desktop');
INSERT INTO `resource`(`id`, `name`, `parent_id`, `key`, `icon`) VALUES (2, '用户管理', 1, '/admin/user', 'user');
INSERT INTO `resource`(`id`, `name`, `parent_id`, `key`, `icon`) VALUES (3, '角色管理', 1, '/admin/role', 'team');
INSERT INTO `resource`(`id`, `name`, `parent_id`, `key`, `icon`) VALUES (4, '权限管理', 1, '/admin/resource', 'idcard');


INSERT INTO `role_resource`(`role_id`, `resource_id`) VALUES (1, 1);
INSERT INTO `role_resource`(`role_id`, `resource_id`) VALUES (1, 2);
INSERT INTO `role_resource`(`role_id`, `resource_id`) VALUES (1, 3);
INSERT INTO `role_resource`(`role_id`, `resource_id`) VALUES (1, 4);
INSERT INTO `role_resource`(`role_id`, `resource_id`) VALUES (2, 2);
INSERT INTO `role_resource`(`role_id`, `resource_id`) VALUES (2, 3);


INSERT INTO `role_user`(`role_id`, `user_id`) VALUES (1, 1);
INSERT INTO `role_user`(`role_id`, `user_id`) VALUES (2, 2);
INSERT INTO `role_user`(`role_id`, `user_id`) VALUES (2, 4);
INSERT INTO `role_user`(`role_id`, `user_id`) VALUES (2, 5);


INSERT INTO `user`(`id`, `username`, `password`, `email`, `phone`, `gender`, `birthday`, `address`) VALUES (1, 'a', 'a', 'a@qq.com', '086undefined', 0, NULL, NULL);
INSERT INTO `user`(`id`, `username`, `password`, `email`, `phone`, `gender`, `birthday`, `address`) VALUES (2, 'aa', 'aa', 'a@qq.com@qq.com', '08615587257427', 0, NULL, NULL);
INSERT INTO `user`(`id`, `username`, `password`, `email`, `phone`, `gender`, `birthday`, `address`) VALUES (3, 'hggj', '12', '12@163.com', '086undefined', 0, NULL, NULL);
INSERT INTO `user`(`id`, `username`, `password`, `email`, `phone`, `gender`, `birthday`, `address`) VALUES (4, 'hggjg', '12', '12 @gmail.com', '086undefined', 0, NULL, NULL);
INSERT INTO `user`(`id`, `username`, `password`, `email`, `phone`, `gender`, `birthday`, `address`) VALUES (5, 'hggjgf', '12', '1212@163.com', '086undefined', 0, NULL, NULL);
INSERT INTO `user`(`id`, `username`, `password`, `email`, `phone`, `gender`, `birthday`, `address`) VALUES (6, 'hggjgff', '12', '1222@163.com', '086undefined', 0, NULL, NULL);
INSERT INTO `user`(`id`, `username`, `password`, `email`, `phone`, `gender`, `birthday`, `address`) VALUES (7, 'hggjgfff', '12', '12 @gmail.com', '086undefined', 0, NULL, NULL);
INSERT INTO `user`(`id`, `username`, `password`, `email`, `phone`, `gender`, `birthday`, `address`) VALUES (8, 'hggjgffff', '12', '12 @gmail.com', '086undefined', 0, NULL, NULL);
INSERT INTO `user`(`id`, `username`, `password`, `email`, `phone`, `gender`, `birthday`, `address`) VALUES (9, 'b', NULL, '3', NULL, NULL, NULL, NULL);
INSERT INTO `user`(`id`, `username`, `password`, `email`, `phone`, `gender`, `birthday`, `address`) VALUES (10, 'c', NULL, '3', NULL, NULL, NULL, NULL);
INSERT INTO `user`(`id`, `username`, `password`, `email`, `phone`, `gender`, `birthday`, `address`) VALUES (11, 'd', NULL, '3', NULL, NULL, NULL, NULL);
INSERT INTO `user`(`id`, `username`, `password`, `email`, `phone`, `gender`, `birthday`, `address`) VALUES (12, 'e', NULL, '3', NULL, NULL, NULL, NULL);
INSERT INTO `user`(`id`, `username`, `password`, `email`, `phone`, `gender`, `birthday`, `address`) VALUES (13, 'f', NULL, '3', NULL, NULL, NULL, NULL);
INSERT INTO `user`(`id`, `username`, `password`, `email`, `phone`, `gender`, `birthday`, `address`) VALUES (14, 'g', NULL, '3', NULL, NULL, NULL, NULL);
INSERT INTO `user`(`id`, `username`, `password`, `email`, `phone`, `gender`, `birthday`, `address`) VALUES (15, 'h', NULL, '3', NULL, NULL, NULL, NULL);
INSERT INTO `user`(`id`, `username`, `password`, `email`, `phone`, `gender`, `birthday`, `address`) VALUES (16, 'i', NULL, '3', NULL, NULL, NULL, NULL);
