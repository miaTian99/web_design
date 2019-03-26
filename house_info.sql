CREATE TABLE `house_info` (
  `house_ID` INT NOT NULL, 					      /*primary key*/
  `house_region` VARCHAR(45) NOT NULL,		/*荣昌or北碚*/
  `position_detail` VARCHAR(255) NOT NULL,/*具体住房信息*/
  `phone_num` VARCHAR(120) NOT NULL,		  /*房主的具体联系方式*/
  `QQ_num` VARCHAR(120) NOT NULL,			    /*房主的具体联系方式*/
  `WeChat_num` VARCHAR(120) NOT NULL,	  	/*房主的具体联系方式*/
  `price` VARCHAR(45) NOT NULL,           
  `rent_type` VARCHAR(45) NOT NULL,			  /*出租类型：e.g.单间or合租*/
  `rent_time` VARCHAR(45) NOT NULL,			  /*出租时长：e.g.周租or月租or年租*/
  `pet` VARCHAR(15) NOT NULL,					    /*是否允许携带宠物：是/否，用boolean类型的数据更好吗？*/
  `house_pic` VARCHAR(255) NOT NULL,		  /*多张房屋图片，储存url，主要由房主提供，多张图片需要多个字段吗?*/
  `facility` VARCHAR(255) NOT NULL,			
  `remarks` VARCHAR(255) NULL,				    /*住房评价，即用户的居住体验，多条，疑问同上*/
  `marked_number` VARCHAR(255) NULL,		  /*收藏数量*/
  PRIMARY KEY (`house_ID`))
ENGINE = InnoDB
PACK_KEYS = DEFAULT
ROW_FORMAT = DEFAULT;
