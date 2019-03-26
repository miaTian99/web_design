CREATE TABLE `items_info` (
  `item_ID` INT NOT NULL,
  `item_type` VARCHAR(120) NOT NULL,   /*物品类型，做成复选框，六类:家具(furniture)、运动健身(sporting)、代步工具(vehicle)、家用电器(electric_appliance)、闲置书(books)、其他(other)*/
  `item_price` VARCHAR(45) NOT NULL,   /*价格*/
  `item_img` VARCHAR(255) NOT NULL,   /*图片*/
  `use_time` VARCHAR(45) NOT NULL,     /*几成新*/
  `phone_num` VARCHAR(120) NOT NULL,   /*出售人联系方式*/
  `QQ_num` VARCHAR(120),					/*出售人联系方式*/
  `WeChat_num` VARCHAR(120),				/*出售人联系方式*/
  `var_price` VARCHAR(45) NOT NULL,	   /*价格是否可议*/
  PRIMARY KEY (`item_ID`))
ENGINE = InnoDB
PACK_KEYS = DEFAULT
ROW_FORMAT = DEFAULT;