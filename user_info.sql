CREATE TABLE `user_info` (
	`user_name` VARCHAR(45) NOT NULL,				 /*primary key*/
	`user_image` VARCHAR(90) NOT NULL,				 /*url，记录上传图片的路径*/
	`email` VARCHAR(120) NOT NULL,
	`phone` VARCHAR(120) NOT NULL,
	`password` VARCHAR(255) NOT NULL,				 /*输入密码后，还有个验证密码，网页中有所体现*/
	`gender` VARCHAR(45) NOT NULL,					 /*复选框:男 or 女*/
	`region` VARCHAR(255) NOT NULL,					 /*复选框:荣昌or北碚or其他*/
	`user_remarks` VARCHAR(255) NULL DEFAULT NULL,/*用户对租住房屋的评价，记录评价房源的ID*/
	`my_house` VARCHAR(45) NULL DEFAULT NULL,     /*我发布的房源,记录ID，其联系信息与房源中的对应*/
	`marked_house` VARCHAR(45) NULL DEFAULT NULL, /*我收藏的房源，记录ID*/
	`my_items` VARCHAR(45) NULL DEFAULT NULL,     /*我发布的闲置物品，记录ID，其联系信息与房源中的对应*/
	`marked_items` VARCHAR(45) NULL DEFAULT NULL, /*我收藏的闲置物品，记录ID*/
/*	`experiences` VARCHAR(45) NULL DEFAULT NULL, 用户体验，记录评价theme或者date，涉及到其他功能暂不考虑*/
	PRIMARY KEY (`user_name`)
)
COLLATE='utf8mb4_0900_ai_ci'
ENGINE=InnoDB
;