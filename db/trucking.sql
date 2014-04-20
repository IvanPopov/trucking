-- phpMyAdmin SQL Dump
-- version 3.5.1
-- http://www.phpmyadmin.net
--
-- Хост: 127.0.0.1
-- Время создания: Апр 20 2014 г., 11:40
-- Версия сервера: 5.5.25
-- Версия PHP: 5.3.13

SET FOREIGN_KEY_CHECKS=0;
SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- База данных: `trucking`
--

-- --------------------------------------------------------

--
-- Структура таблицы `accesstokens`
--
-- Создание: Фев 17 2014 г., 15:35
--

CREATE TABLE IF NOT EXISTS `accesstokens` (
  `id_employee` int(11) NOT NULL,
  `id_clientapp` varchar(32) NOT NULL,
  `value` varchar(64) NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_clientapp`,`id_employee`),
  KEY `fk_AccessTokens_Employees1_idx` (`id_employee`),
  KEY `fk_AccessTokens_ClientApps1_idx` (`id_clientapp`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- СВЯЗИ ТАБЛИЦЫ `accesstokens`:
--   `id_clientapp`
--       `clientapps` -> `id_client`
--   `id_employee`
--       `employees` -> `id_employee`
--

--
-- Дамп данных таблицы `accesstokens`
--

INSERT INTO `accesstokens` (`id_employee`, `id_clientapp`, `value`, `created`) VALUES
(1, 'web_v1', 'jhp7K2aKjPjXgufuT32KgzZME3cwxAKcb/IL4ItmPqU=', '2014-04-06 19:18:38');

-- --------------------------------------------------------

--
-- Структура таблицы `addresstype`
--
-- Создание: Фев 17 2014 г., 15:35
--

CREATE TABLE IF NOT EXISTS `addresstype` (
  `id_addresstype` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `type` varchar(45) NOT NULL,
  `description` text,
  PRIMARY KEY (`id_addresstype`),
  UNIQUE KEY `id_addresstype_UNIQUE` (`id_addresstype`),
  UNIQUE KEY `type_UNIQUE` (`type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Справочник типов адресов' AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Структура таблицы `brigades`
--
-- Создание: Мар 15 2014 г., 12:29
--

CREATE TABLE IF NOT EXISTS `brigades` (
  `id_brigade` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `id_leader` int(10) unsigned NOT NULL DEFAULT '0' COMMENT 'Бригадир',
  PRIMARY KEY (`id_brigade`,`id_leader`),
  KEY `fk_Brigades_NaturalPersons1_idx` (`id_leader`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Справочник "бригады"' AUTO_INCREMENT=1 ;

--
-- СВЯЗИ ТАБЛИЦЫ `brigades`:
--   `id_leader`
--       `naturalpersons` -> `id_naturalperson`
--

-- --------------------------------------------------------

--
-- Структура таблицы `clientapps`
--
-- Создание: Фев 17 2014 г., 15:35
--

CREATE TABLE IF NOT EXISTS `clientapps` (
  `id_client` varchar(32) NOT NULL,
  `name` varchar(256) NOT NULL,
  `secret` varchar(128) NOT NULL COMMENT 'OAUTH 2.0\nclient_secret',
  PRIMARY KEY (`id_client`),
  UNIQUE KEY `id_UNIQUE` (`id_client`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Данные о клиентах, которым разрешено подключаться';

--
-- Дамп данных таблицы `clientapps`
--

INSERT INTO `clientapps` (`id_client`, `name`, `secret`) VALUES
('web_v1', 'Web client', 'abc123456');

-- --------------------------------------------------------

--
-- Структура таблицы `conditionsofwork`
--
-- Создание: Фев 17 2014 г., 15:35
--

CREATE TABLE IF NOT EXISTS `conditionsofwork` (
  `id_сonditionofwork` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `terms` text NOT NULL,
  `description` text,
  PRIMARY KEY (`id_сonditionofwork`),
  UNIQUE KEY `id_сonditionofwork_UNIQUE` (`id_сonditionofwork`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Справочник условий работы' AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Структура таблицы `contactpersons`
--
-- Создание: Фев 17 2014 г., 15:35
--

CREATE TABLE IF NOT EXISTS `contactpersons` (
  `id_contactperson` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(256) NOT NULL,
  `phone` varchar(45) NOT NULL,
  `email` varchar(45) DEFAULT NULL,
  `position` varchar(45) DEFAULT NULL,
  `comment` text,
  `id_employee` int(11) NOT NULL,
  `id_сontractor` int(10) unsigned DEFAULT NULL COMMENT 'Каждый контакт может (не)принадлежать контрагенту, например это менеджер, или грузчик или еще кто то.',
  PRIMARY KEY (`id_contactperson`),
  UNIQUE KEY `id_contact_UNIQUE` (`id_contactperson`),
  KEY `fk_Contacts_Employees1_idx` (`id_employee`),
  KEY `fk_Contacts_Сontractors1_idx` (`id_сontractor`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Контактное лицо.\nПоправить на контактное лицо(ContactPersons)' AUTO_INCREMENT=1 ;

--
-- СВЯЗИ ТАБЛИЦЫ `contactpersons`:
--   `id_сontractor`
--       `contractors` -> `id_сontractor`
--   `id_employee`
--       `employees` -> `id_employee`
--

-- --------------------------------------------------------

--
-- Структура таблицы `contractors`
--
-- Создание: Фев 17 2014 г., 15:35
--

CREATE TABLE IF NOT EXISTS `contractors` (
  `id_сontractor` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_holding` int(10) unsigned DEFAULT NULL,
  `id_employee` int(11) NOT NULL,
  `name` varchar(256) NOT NULL,
  `short_name` varchar(45) NOT NULL,
  `id_contractortype` int(11) NOT NULL COMMENT ' "клиент"',
  `payment_method` tinyint(3) unsigned NOT NULL DEFAULT '0' COMMENT 'Способ оплаты\n',
  `cost` tinyint(4) NOT NULL DEFAULT '0' COMMENT 'цены (???? 4 типа ????)\n0 номенклатура \n1 тип работ\n2 инструменты\n3 ставка клиент\n',
  `id_paymentterm` int(10) unsigned NOT NULL,
  `id_prepaymentterm` int(10) unsigned NOT NULL,
  `id_сonditionofwork` int(10) unsigned NOT NULL,
  `id_main_manager` int(10) unsigned NOT NULL COMMENT 'Основной менеджер\n\n(остальных менеджеровм см в талице Contractorsmanagers)',
  `id_scopeofthecompany` int(10) unsigned NOT NULL,
  `address_for_documents` varchar(256) NOT NULL,
  `id_addresstype` int(10) unsigned NOT NULL COMMENT 'тип документации',
  `courier` tinyint(1) NOT NULL DEFAULT '0',
  `id_responsible_for_documentation` int(10) unsigned NOT NULL,
  `requisites` binary(1) NOT NULL COMMENT 'Реквизиты в виде прикрепленного документа',
  `id_contract` int(10) unsigned NOT NULL COMMENT 'Договор',
  PRIMARY KEY (`id_сontractor`,`id_main_manager`,`id_responsible_for_documentation`,`id_contract`),
  UNIQUE KEY `id_сontractors_UNIQUE` (`id_сontractor`),
  UNIQUE KEY `short_name_UNIQUE` (`short_name`),
  KEY `fk_Сontractors_Employees1_idx` (`id_employee`),
  KEY `fk_Сontractors_Holdings1_idx` (`id_holding`),
  KEY `fk_Сontractors_PaymentTerms1_idx` (`id_paymentterm`),
  KEY `fk_Сontractors_PrepaymentTerms1_idx` (`id_prepaymentterm`),
  KEY `fk_Сontractors_СonditionsOfWork1_idx` (`id_сonditionofwork`),
  KEY `fk_Сontractors_Contacts1_idx` (`id_main_manager`),
  KEY `fk_Сontractors_ScopeOfTheCompany1_idx` (`id_scopeofthecompany`),
  KEY `fk_Сontractors_AddressType1_idx` (`id_addresstype`),
  KEY `fk_Сontractors_Сontract1_idx` (`id_contract`),
  KEY `fk_Сontractors_Contacts3_idx` (`id_responsible_for_documentation`),
  KEY `fk_Сontractors_ContractorTypes1_idx` (`id_contractortype`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='"Условия сотрудничеств" еще не прописаны.' AUTO_INCREMENT=1 ;

--
-- СВЯЗИ ТАБЛИЦЫ `contractors`:
--   `id_employee`
--       `employees` -> `id_employee`
--   `id_addresstype`
--       `addresstype` -> `id_addresstype`
--   `id_main_manager`
--       `contactpersons` -> `id_contactperson`
--   `id_responsible_for_documentation`
--       `contactpersons` -> `id_contactperson`
--   `id_contractortype`
--       `contractortypes` -> `id_contractortype`
--   `id_сonditionofwork`
--       `conditionsofwork` -> `id_сonditionofwork`
--   `id_contract`
--       `files` -> `id_file`
--   `id_holding`
--       `holdings` -> `id_holding`
--   `id_paymentterm`
--       `paymentterms` -> `id_paymentterm`
--   `id_prepaymentterm`
--       `prepaymentterms` -> `id_prepaymentterm`
--   `id_scopeofthecompany`
--       `scopeofthecompany` -> `id_scopeofthecompany`
--

-- --------------------------------------------------------

--
-- Структура таблицы `contractorscontacts`
--
-- Создание: Фев 17 2014 г., 15:35
--

CREATE TABLE IF NOT EXISTS `contractorscontacts` (
  `id_сontractor` int(10) unsigned NOT NULL,
  `id_contactperson` int(10) unsigned NOT NULL,
  `role` tinyint(3) unsigned NOT NULL DEFAULT '0' COMMENT 'роль (заказчик, контактное лицо, ответственный за документацию)\n',
  `comment` varchar(256) DEFAULT NULL,
  KEY `fk_ContractorsContacts_Сontractors1_idx` (`id_сontractor`),
  KEY `fk_ContractorsContacts_Contacts1_idx` (`id_contactperson`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- СВЯЗИ ТАБЛИЦЫ `contractorscontacts`:
--   `id_contactperson`
--       `contactpersons` -> `id_contactperson`
--   `id_сontractor`
--       `contractors` -> `id_сontractor`
--

-- --------------------------------------------------------

--
-- Структура таблицы `contractorsnomenclature`
--
-- Создание: Фев 17 2014 г., 15:35
--

CREATE TABLE IF NOT EXISTS `contractorsnomenclature` (
  `id_сontractor` int(10) unsigned NOT NULL,
  `id_nomenclature` int(10) unsigned NOT NULL,
  KEY `fk_ContractorsNomenclature_Сontractors1_idx` (`id_сontractor`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- СВЯЗИ ТАБЛИЦЫ `contractorsnomenclature`:
--   `id_сontractor`
--       `contractors` -> `id_сontractor`
--

-- --------------------------------------------------------

--
-- Структура таблицы `contractortypes`
--
-- Создание: Фев 22 2014 г., 10:49
--

CREATE TABLE IF NOT EXISTS `contractortypes` (
  `id_contractortype` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(128) NOT NULL,
  PRIMARY KEY (`id_contractortype`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- Дамп данных таблицы `contractortypes`
--

INSERT INTO `contractortypes` (`id_contractortype`, `name`) VALUES
(1, 'Клиент'),
(2, 'Конкурент');

-- --------------------------------------------------------

--
-- Структура таблицы `contratorsmanagersadditional`
--
-- Создание: Фев 17 2014 г., 15:35
--

CREATE TABLE IF NOT EXISTS `contratorsmanagersadditional` (
  `id_contactperson` int(10) unsigned NOT NULL,
  `id_сontractor` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id_contactperson`),
  KEY `fk_ContratorsManagers_Contacts1_idx` (`id_contactperson`),
  KEY `fk_ContratorsManagers_Сontractors1_idx` (`id_сontractor`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Соответствие менеджеров и контрагентов.\nПодумать над названием!!!';

--
-- СВЯЗИ ТАБЛИЦЫ `contratorsmanagersadditional`:
--   `id_contactperson`
--       `contactpersons` -> `id_contactperson`
--   `id_сontractor`
--       `contractors` -> `id_сontractor`
--

-- --------------------------------------------------------

--
-- Структура таблицы `employees`
--
-- Создание: Фев 17 2014 г., 15:35
--

CREATE TABLE IF NOT EXISTS `employees` (
  `id_employee` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(128) NOT NULL,
  `hashed_password` varchar(64) NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `email` varchar(45) NOT NULL,
  `salt` varchar(64) NOT NULL,
  `permissions` int(11) NOT NULL DEFAULT '0' COMMENT 'Пока что используется базовый вариант\n1 - супер админ\n0 - все остальные\n',
  PRIMARY KEY (`id_employee`),
  UNIQUE KEY `id_employee_UNIQUE` (`id_employee`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT='Сотрудники' AUTO_INCREMENT=2 ;

--
-- Дамп данных таблицы `employees`
--

INSERT INTO `employees` (`id_employee`, `name`, `hashed_password`, `created`, `email`, `salt`, `permissions`) VALUES
(1, 'admin', '8e21e2745f93829d7806edf160611fdb4cb7e500', '2014-02-02 12:27:32', 'admin@example.org', 'chafQNKy8fRj3TYb8wq6BesZrSKPj9vzdO37ruEj2G4=', 1);

-- --------------------------------------------------------

--
-- Структура таблицы `files`
--
-- Создание: Фев 17 2014 г., 15:35
--

CREATE TABLE IF NOT EXISTS `files` (
  `id_file` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `data` binary(1) DEFAULT NULL,
  `date` datetime NOT NULL,
  `id_employee` int(11) NOT NULL,
  PRIMARY KEY (`id_file`),
  UNIQUE KEY `id_contract_UNIQUE` (`id_file`),
  KEY `fk_Files_Employees1_idx` (`id_employee`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

--
-- СВЯЗИ ТАБЛИЦЫ `files`:
--   `id_employee`
--       `employees` -> `id_employee`
--

-- --------------------------------------------------------

--
-- Структура таблицы `filesinorder`
--
-- Создание: Фев 17 2014 г., 15:35
--

CREATE TABLE IF NOT EXISTS `filesinorder` (
  `id_order` int(10) unsigned NOT NULL,
  `id_file` int(10) unsigned NOT NULL,
  KEY `fk_FilesInOrder_Orders1_idx` (`id_order`),
  KEY `fk_FilesInOrder_Files1_idx` (`id_file`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- СВЯЗИ ТАБЛИЦЫ `filesinorder`:
--   `id_file`
--       `files` -> `id_file`
--   `id_order`
--       `orders` -> `id_order`
--

-- --------------------------------------------------------

--
-- Структура таблицы `holdings`
--
-- Создание: Фев 17 2014 г., 15:35
--

CREATE TABLE IF NOT EXISTS `holdings` (
  `id_holding` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(256) NOT NULL,
  `short_name` varchar(45) NOT NULL,
  PRIMARY KEY (`id_holding`),
  UNIQUE KEY `id_holding_UNIQUE` (`id_holding`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Структура таблицы `metro`
--
-- Создание: Фев 17 2014 г., 15:35
--

CREATE TABLE IF NOT EXISTS `metro` (
  `id_metro` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `station` varchar(128) DEFAULT NULL,
  `id_metrobranch` int(10) unsigned NOT NULL,
  `id_territorialsign` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id_metro`),
  UNIQUE KEY `id_Metro_UNIQUE` (`id_metro`),
  UNIQUE KEY `station_UNIQUE` (`station`),
  KEY `fk_Metro_MetroBranches1_idx` (`id_metrobranch`),
  KEY `fk_Metro_TerritorialSigns1_idx` (`id_territorialsign`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT='Справочни станций метро' AUTO_INCREMENT=79 ;

--
-- СВЯЗИ ТАБЛИЦЫ `metro`:
--   `id_metrobranch`
--       `metrobranches` -> `id_metrobranch`
--   `id_territorialsign`
--       `territorialsigns` -> `id_territorialsign`
--

--
-- Дамп данных таблицы `metro`
--

INSERT INTO `metro` (`id_metro`, `station`, `id_metrobranch`, `id_territorialsign`) VALUES
(47, 'Октябрьское Поле', 2, NULL),
(48, 'Тушинская', 2, NULL),
(49, 'Щукинская', 1, NULL),
(51, 'Баррикадная', 1, NULL),
(52, 'Выхино', 2, NULL),
(53, 'Пушкинская', 2, NULL),
(54, 'Проспект вернадского', 2, NULL),
(55, 'новая станция', 2, NULL),
(69, 'some5', 5, NULL),
(77, 'some6', 1, NULL),
(78, 'some10', 1, NULL);

-- --------------------------------------------------------

--
-- Структура таблицы `metrobranches`
--
-- Создание: Фев 17 2014 г., 15:35
--

CREATE TABLE IF NOT EXISTS `metrobranches` (
  `id_metrobranch` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(128) NOT NULL,
  `color` int(11) NOT NULL,
  PRIMARY KEY (`id_metrobranch`),
  UNIQUE KEY `id_metrobranch_UNIQUE` (`id_metrobranch`),
  UNIQUE KEY `color_UNIQUE` (`color`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT='Справочник веток метро' AUTO_INCREMENT=6 ;

--
-- Дамп данных таблицы `metrobranches`
--

INSERT INTO `metrobranches` (`id_metrobranch`, `name`, `color`) VALUES
(1, 'Сокольническая', 255),
(2, 'Арбатско-Покровская', 10821572),
(4, 'Таганско-Краснопресненская', 1257937),
(5, 'Калужско-Рижская', 4052988);

-- --------------------------------------------------------

--
-- Структура таблицы `metrostreets`
--
-- Создание: Апр 06 2014 г., 07:59
--

CREATE TABLE IF NOT EXISTS `metrostreets` (
  `id_metro` int(10) unsigned NOT NULL,
  `id_street` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id_metro`,`id_street`),
  KEY `fk_MetroStreets_Metro1_idx` (`id_metro`),
  KEY `fk_MetroStreets_Streets1_idx` (`id_street`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- СВЯЗИ ТАБЛИЦЫ `metrostreets`:
--   `id_metro`
--       `metro` -> `id_metro`
--   `id_street`
--       `streets` -> `id_street`
--

--
-- Дамп данных таблицы `metrostreets`
--

INSERT INTO `metrostreets` (`id_metro`, `id_street`) VALUES
(51, 1),
(55, 1);

-- --------------------------------------------------------

--
-- Структура таблицы `naturalpersons`
--
-- Создание: Мар 15 2014 г., 11:37
--

CREATE TABLE IF NOT EXISTS `naturalpersons` (
  `id_naturalperson` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_employee` int(11) NOT NULL COMMENT 'кто добавил сотрудника',
  `name` varchar(256) DEFAULT NULL,
  `pass_serial` int(4) unsigned DEFAULT NULL,
  `pass_number` int(6) unsigned DEFAULT NULL,
  `pass_issued` varchar(256) DEFAULT NULL,
  `card_number` int(16) DEFAULT NULL,
  `card_expired` datetime DEFAULT NULL,
  `requisites_comment` varchar(256) DEFAULT NULL,
  `id_leading_type_of_work` int(11) DEFAULT NULL COMMENT 'Ведущий тип работ',
  `address` varchar(256) DEFAULT NULL,
  `id_metro` int(10) unsigned DEFAULT NULL,
  `id_brigade` int(10) unsigned DEFAULT NULL,
  `DOB` date DEFAULT NULL COMMENT 'day of birthday',
  `date_of_employment` date DEFAULT NULL,
  `fired` tinyint(1) DEFAULT '0',
  `firing_comments` varchar(256) DEFAULT NULL,
  `id_firing_employee` int(11) DEFAULT NULL COMMENT 'Сотрудник который уволил',
  `clothing_size` varchar(45) DEFAULT NULL COMMENT 'размер одежды в чем угодно',
  `height` int(11) DEFAULT NULL COMMENT 'рост в метрах',
  PRIMARY KEY (`id_naturalperson`),
  KEY `fk_NaturalPersons_Metro1_idx` (`id_metro`),
  KEY `fk_NaturalPersons_Brigades1_idx` (`id_brigade`),
  KEY `fk_NaturalPersons_Employees1_idx` (`id_employee`),
  KEY `fk_NaturalPersons_Employees2_idx` (`id_firing_employee`),
  KEY `fk_leading_type_of_work` (`id_naturalperson`,`id_leading_type_of_work`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

--
-- СВЯЗИ ТАБЛИЦЫ `naturalpersons`:
--   `id_employee`
--       `employees` -> `id_employee`
--

--
-- Дамп данных таблицы `naturalpersons`
--

INSERT INTO `naturalpersons` (`id_naturalperson`, `id_employee`, `name`, `pass_serial`, `pass_number`, `pass_issued`, `card_number`, `card_expired`, `requisites_comment`, `id_leading_type_of_work`, `address`, `id_metro`, `id_brigade`, `DOB`, `date_of_employment`, `fired`, `firing_comments`, `id_firing_employee`, `clothing_size`, `height`) VALUES
(4, 1, 'Иванов Иван Иванович', 0, 0, 'Выдан МВД какойто области..', NULL, NULL, NULL, 1, '4ый проезд Марьиной рощи, 10', 3, NULL, '2000-12-02', '2013-12-02', 0, '', NULL, '50', 190);

-- --------------------------------------------------------

--
-- Структура таблицы `naturalpersonsemails`
--
-- Создание: Мар 15 2014 г., 11:40
--

CREATE TABLE IF NOT EXISTS `naturalpersonsemails` (
  `id_naturalperson` int(10) unsigned NOT NULL,
  `email` varchar(45) NOT NULL,
  UNIQUE KEY `email_UNIQUE` (`email`),
  KEY `fk_NaturalPersonsPhones_NaturalPersons1_idx` (`id_naturalperson`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- СВЯЗИ ТАБЛИЦЫ `naturalpersonsemails`:
--   `id_naturalperson`
--       `naturalpersons` -> `id_naturalperson`
--

--
-- Дамп данных таблицы `naturalpersonsemails`
--

INSERT INTO `naturalpersonsemails` (`id_naturalperson`, `email`) VALUES
(4, 'admin@example.org'),
(4, 'ivanov@example.com');

-- --------------------------------------------------------

--
-- Структура таблицы `naturalpersonsphones`
--
-- Создание: Мар 15 2014 г., 11:39
--

CREATE TABLE IF NOT EXISTS `naturalpersonsphones` (
  `id_naturalperson` int(10) unsigned NOT NULL,
  `phone` varchar(45) NOT NULL,
  UNIQUE KEY `phone_UNIQUE` (`phone`),
  KEY `fk_NaturalPersonsPhones_NaturalPersons1_idx` (`id_naturalperson`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- СВЯЗИ ТАБЛИЦЫ `naturalpersonsphones`:
--   `id_naturalperson`
--       `naturalpersons` -> `id_naturalperson`
--

--
-- Дамп данных таблицы `naturalpersonsphones`
--

INSERT INTO `naturalpersonsphones` (`id_naturalperson`, `phone`) VALUES
(4, '+7 (910) 400-40-40'),
(4, '+7 (917) 500-0000');

-- --------------------------------------------------------

--
-- Структура таблицы `naturalpersonstools`
--
-- Создание: Мар 15 2014 г., 11:39
--

CREATE TABLE IF NOT EXISTS `naturalpersonstools` (
  `id_tool` int(10) unsigned NOT NULL,
  `id_naturalperson` int(10) unsigned NOT NULL,
  `count` mediumint(8) unsigned NOT NULL DEFAULT '0',
  `personal` tinyint(1) NOT NULL DEFAULT '0',
  `personal_rate` float DEFAULT NULL,
  PRIMARY KEY (`id_naturalperson`,`id_tool`),
  KEY `fk_NaturalPersonsTools_Tools1_idx` (`id_tool`),
  KEY `fk_NaturalPersonsTools_NaturalPersons1_idx` (`id_naturalperson`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- СВЯЗИ ТАБЛИЦЫ `naturalpersonstools`:
--   `id_tool`
--       `tools` -> `id_tool`
--   `id_naturalperson`
--       `naturalpersons` -> `id_naturalperson`
--

--
-- Дамп данных таблицы `naturalpersonstools`
--

INSERT INTO `naturalpersonstools` (`id_tool`, `id_naturalperson`, `count`, `personal`, `personal_rate`) VALUES
(10, 4, 10, 0, NULL);

-- --------------------------------------------------------

--
-- Структура таблицы `naturalpersonsworktypes`
--
-- Создание: Мар 15 2014 г., 11:36
--

CREATE TABLE IF NOT EXISTS `naturalpersonsworktypes` (
  `id_worktype` int(11) NOT NULL,
  `id_naturalperson` int(10) unsigned NOT NULL,
  `personal_rate` float DEFAULT NULL,
  PRIMARY KEY (`id_naturalperson`,`id_worktype`),
  KEY `fk_NaturalPersonsWorkTypes_WorkTypes1_idx` (`id_worktype`),
  KEY `fk_NaturalPersonsWorkTypes_NaturalPersons1_idx` (`id_naturalperson`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Какие работы умеет делать физ лицо.';

--
-- СВЯЗИ ТАБЛИЦЫ `naturalpersonsworktypes`:
--   `id_naturalperson`
--       `naturalpersons` -> `id_naturalperson`
--   `id_worktype`
--       `worktypes` -> `id_worktype`
--

--
-- Дамп данных таблицы `naturalpersonsworktypes`
--

INSERT INTO `naturalpersonsworktypes` (`id_worktype`, `id_naturalperson`, `personal_rate`) VALUES
(1, 4, 221);

-- --------------------------------------------------------

--
-- Структура таблицы `orders`
--
-- Создание: Фев 17 2014 г., 15:35
--

CREATE TABLE IF NOT EXISTS `orders` (
  `id_order` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_employee` int(11) NOT NULL,
  `id_сontractor` int(10) unsigned NOT NULL,
  `payment_method` tinyint(3) unsigned NOT NULL DEFAULT '0' COMMENT 'Способ оплаты',
  `id_paymentterm` int(10) unsigned DEFAULT NULL,
  `prepay` tinyint(1) NOT NULL DEFAULT '0',
  `start_date` datetime NOT NULL COMMENT 'Дата начала\nЭто поле делится на само поле с информацией и стрелочками, где находятся стрелочки вверх и вниз, а в самом поле серым цветом стоит дата текущая в формате "дд.мм.гг. кратко день недели". Например: "13.10.13 вск". \n\nВремя начала\nЭто поле расположено справа от даты начала, оно изначально пустое, нажатие на поле открывает такое же всплывающее окно, как и для "дата начала", в нем отображается также заполненная ранее информация в полях "время начала" и "дата начала". Введенные тут данные в календаре, меняют поле "дата начала", а в ползунке меняет текущее поле, если нажать "сохранить".\n',
  `predicted_time` time DEFAULT NULL COMMENT 'Прогнозируемое время работы\nЭто поле, в котором отображена информация в формате "чч:мм", изначально оно пустое, а нажатие на поле вызывает всплывающее окно с ползуноком, кол-ом часов, кнопками сохранить и закрыть.Ползунок  такой же, как и в всплывающем окне для даты и времени начала, но с шагом в 30 минут. Кнопка сохранить закрывает и сохраняет введенные данные, кнопка закрыть закрывает всплывающее окно без сохранения.\n\nNULL - значит не известно',
  `comment` varchar(512) DEFAULT NULL,
  PRIMARY KEY (`id_order`),
  UNIQUE KEY `id_order_UNIQUE` (`id_order`) COMMENT 'ID заказа',
  KEY `fk_Orders_Employees_idx` (`id_employee`),
  KEY `fk_Orders_Сontractors1_idx` (`id_сontractor`),
  KEY `fk_Orders_PaymentTerms1_idx` (`id_paymentterm`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Заказы' AUTO_INCREMENT=1 ;

--
-- СВЯЗИ ТАБЛИЦЫ `orders`:
--   `id_сontractor`
--       `contractors` -> `id_сontractor`
--   `id_employee`
--       `employees` -> `id_employee`
--   `id_paymentterm`
--       `paymentterms` -> `id_paymentterm`
--

-- --------------------------------------------------------

--
-- Структура таблицы `paymentterms`
--
-- Создание: Фев 17 2014 г., 15:35
--

CREATE TABLE IF NOT EXISTS `paymentterms` (
  `id_paymentterm` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `terms` text NOT NULL COMMENT 'Условия предоплаты\nтекстовое поле, появляется только если поставлена галочка у “предоплаты”, а внутри него красным цветом поле для заполнения текста, оно становится не красным, только если вбит в этом поле хотя бы 1 символ. \n',
  `description` text,
  PRIMARY KEY (`id_paymentterm`),
  UNIQUE KEY `id_paymentterms_UNIQUE` (`id_paymentterm`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Справочник условий оплаты' AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Структура таблицы `prepaymentterms`
--
-- Создание: Фев 17 2014 г., 15:35
--

CREATE TABLE IF NOT EXISTS `prepaymentterms` (
  `id_prepaymentterm` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `terms` text NOT NULL COMMENT 'Условия предоплаты\nтекстовое поле, появляется только если поставлена галочка у “предоплаты”, а внутри него красным цветом поле для заполнения текста, оно становится не красным, только если вбит в этом поле хотя бы 1 символ. \n',
  `description` text,
  PRIMARY KEY (`id_prepaymentterm`),
  UNIQUE KEY `id_paymentterms_UNIQUE` (`id_prepaymentterm`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Справочник условий предоплаты' AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Структура таблицы `refreshtokens`
--
-- Создание: Фев 17 2014 г., 15:35
--

CREATE TABLE IF NOT EXISTS `refreshtokens` (
  `id_employee` int(11) NOT NULL,
  `id_clientapp` varchar(32) NOT NULL,
  `value` varchar(64) NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_clientapp`,`id_employee`),
  KEY `fk_AccessTokens_Employees1_idx` (`id_employee`),
  KEY `fk_AccessTokens_ClientApps1_idx` (`id_clientapp`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- СВЯЗИ ТАБЛИЦЫ `refreshtokens`:
--   `id_clientapp`
--       `clientapps` -> `id_client`
--   `id_employee`
--       `employees` -> `id_employee`
--

--
-- Дамп данных таблицы `refreshtokens`
--

INSERT INTO `refreshtokens` (`id_employee`, `id_clientapp`, `value`, `created`) VALUES
(1, 'web_v1', 'kD9R57Gt2McIZuhXHy8qFpl6AOJcGSHMfyvvbtkMYKs=', '2014-04-06 19:18:38');

-- --------------------------------------------------------

--
-- Структура таблицы `scopeofthecompany`
--
-- Создание: Фев 17 2014 г., 15:35
--

CREATE TABLE IF NOT EXISTS `scopeofthecompany` (
  `id_scopeofthecompany` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `scope` varchar(128) NOT NULL,
  `description` text,
  PRIMARY KEY (`id_scopeofthecompany`),
  UNIQUE KEY `id_scopeofthecompany_UNIQUE` (`id_scopeofthecompany`),
  UNIQUE KEY `scope_UNIQUE` (`scope`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Справочник (сфера деятельности компании)' AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Структура таблицы `streets`
--
-- Создание: Фев 17 2014 г., 15:35
--

CREATE TABLE IF NOT EXISTS `streets` (
  `id_street` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(128) NOT NULL,
  `comment` text,
  PRIMARY KEY (`id_street`),
  UNIQUE KEY `id_street_UNIQUE` (`id_street`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- Дамп данных таблицы `streets`
--

INSERT INTO `streets` (`id_street`, `name`, `comment`) VALUES
(1, '4-я улица Марьиной рощи', NULL);

-- --------------------------------------------------------

--
-- Структура таблицы `territorialsigns`
--
-- Создание: Фев 17 2014 г., 15:35
--

CREATE TABLE IF NOT EXISTS `territorialsigns` (
  `id_territorialsign` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(128) NOT NULL,
  `color` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id_territorialsign`),
  UNIQUE KEY `idTerritorialSign_UNIQUE` (`id_territorialsign`),
  UNIQUE KEY `name_UNIQUE` (`name`),
  UNIQUE KEY `color_UNIQUE` (`color`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Структура таблицы `toolgroups`
--
-- Создание: Фев 22 2014 г., 13:46
--

CREATE TABLE IF NOT EXISTS `toolgroups` (
  `id_toolgroup` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(128) NOT NULL,
  PRIMARY KEY (`id_toolgroup`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT='Группы инструментов' AUTO_INCREMENT=3 ;

--
-- Дамп данных таблицы `toolgroups`
--

INSERT INTO `toolgroups` (`id_toolgroup`, `name`) VALUES
(1, 'Группа 1'),
(2, 'Группа 2');

-- --------------------------------------------------------

--
-- Структура таблицы `tools`
--
-- Создание: Фев 17 2014 г., 15:35
--

CREATE TABLE IF NOT EXISTS `tools` (
  `id_tool` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `description` varchar(256) DEFAULT NULL,
  `unit` varchar(16) NOT NULL,
  `rate` float NOT NULL DEFAULT '0',
  `rate_sec` float DEFAULT NULL,
  `unit_sec` varchar(16) DEFAULT NULL,
  `id_toolgroup` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_tool`),
  UNIQUE KEY `id_tool_UNIQUE` (`id_tool`),
  UNIQUE KEY `name_UNIQUE` (`name`),
  KEY `fk_Tools_Units1_idx` (`unit`),
  KEY `tools_ibfk_2_idx` (`unit_sec`),
  KEY `fk_Tools_ToolGroups1_idx` (`id_toolgroup`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT='Справочник "Инструменты"' AUTO_INCREMENT=11 ;

--
-- СВЯЗИ ТАБЛИЦЫ `tools`:
--   `id_toolgroup`
--       `toolgroups` -> `id_toolgroup`
--   `unit`
--       `units` -> `unit`
--   `unit_sec`
--       `units` -> `unit`
--

--
-- Дамп данных таблицы `tools`
--

INSERT INTO `tools` (`id_tool`, `name`, `description`, `unit`, `rate`, `rate_sec`, `unit_sec`, `id_toolgroup`) VALUES
(9, 'Зубило', 'Чтобы зубить...', 'ч', 100, NULL, NULL, 1),
(10, 'Шпатель', 'Чтобы шпатить...', 'м', 200, NULL, NULL, 2);

-- --------------------------------------------------------

--
-- Структура таблицы `toolsforworkinorder`
--
-- Создание: Фев 17 2014 г., 15:35
--

CREATE TABLE IF NOT EXISTS `toolsforworkinorder` (
  `id_workinorder` int(10) unsigned NOT NULL,
  `id_tool` int(10) unsigned NOT NULL,
  `count` int(10) unsigned NOT NULL DEFAULT '0',
  KEY `fk_ToolsForWorkInOrder_WorkInOrder1_idx` (`id_workinorder`),
  KEY `fk_ToolsForWorkInOrder_Tools1_idx` (`id_tool`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Набор инструментов, необходимых для выполнения одного из типов работ';

--
-- СВЯЗИ ТАБЛИЦЫ `toolsforworkinorder`:
--   `id_tool`
--       `tools` -> `id_tool`
--   `id_workinorder`
--       `workinorder` -> `id_workinorder`
--

-- --------------------------------------------------------

--
-- Структура таблицы `units`
--
-- Создание: Фев 22 2014 г., 11:56
--

CREATE TABLE IF NOT EXISTS `units` (
  `unit` varchar(16) NOT NULL,
  `description` varchar(128) DEFAULT NULL,
  PRIMARY KEY (`unit`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `units`
--

INSERT INTO `units` (`unit`, `description`) VALUES
('м', 'метры'),
('ч', 'часы');

-- --------------------------------------------------------

--
-- Структура таблицы `workers`
--
-- Создание: Фев 17 2014 г., 15:35
--

CREATE TABLE IF NOT EXISTS `workers` (
  `id_worker` int(10) unsigned NOT NULL,
  `id_workinorder` int(10) unsigned NOT NULL,
  `id_naturalperson` int(10) unsigned NOT NULL,
  `id_worktype` int(11) NOT NULL,
  `work_count` float NOT NULL DEFAULT '0',
  `rate_pub` float NOT NULL DEFAULT '0' COMMENT 'ставка издания',
  `rate_client` float NOT NULL DEFAULT '0' COMMENT 'ставка клиента',
  `fixed_pub` float NOT NULL DEFAULT '0' COMMENT 'фиксированное издание',
  `fixed_client` float NOT NULL DEFAULT '0' COMMENT 'фиксированная ставка клиента',
  `time_for_payment` time NOT NULL COMMENT 'время для оплаты = чистое время + время на дорогу, хотя  может быть изменено и вручную',
  `time_on_the_road` time NOT NULL DEFAULT '00:00:00' COMMENT 'время на дорогу',
  `time_pure` time NOT NULL COMMENT 'чистое время',
  `expenses` float NOT NULL DEFAULT '0' COMMENT 'издержки',
  `forfeit` float NOT NULL DEFAULT '0',
  `id_worker_took_the_money` int(10) unsigned NOT NULL COMMENT 'человек который забрал его деньги',
  PRIMARY KEY (`id_worker`),
  UNIQUE KEY `id_worker_UNIQUE` (`id_worker`),
  KEY `fk_Workers_NaturalPersons1_idx` (`id_naturalperson`),
  KEY `fk_Workers_WorkTypes1_idx` (`id_worktype`),
  KEY `fk_Workers_WorkInOrder1_idx` (`id_workinorder`),
  KEY `fk_Workers_Workers1_idx` (`id_worker_took_the_money`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Те, кто должны исполнять работу из таблицы WorkInOrder';

--
-- СВЯЗИ ТАБЛИЦЫ `workers`:
--   `id_worker_took_the_money`
--       `workers` -> `id_worker`
--   `id_workinorder`
--       `workinorder` -> `id_workinorder`
--   `id_worktype`
--       `worktypes` -> `id_worktype`
--

-- --------------------------------------------------------

--
-- Структура таблицы `workerstools`
--
-- Создание: Фев 17 2014 г., 15:35
--

CREATE TABLE IF NOT EXISTS `workerstools` (
  `id_worker` int(10) unsigned NOT NULL,
  `id_tool` int(10) unsigned NOT NULL,
  `count` int(10) unsigned NOT NULL DEFAULT '0',
  KEY `fk_WorkersTools_Workers1_idx` (`id_worker`),
  KEY `fk_WorkersTools_Tools1_idx` (`id_tool`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Сколько инструментов какого типа числится за конкретным работником в заказе';

--
-- СВЯЗИ ТАБЛИЦЫ `workerstools`:
--   `id_tool`
--       `tools` -> `id_tool`
--   `id_worker`
--       `workers` -> `id_worker`
--

-- --------------------------------------------------------

--
-- Структура таблицы `workinorder`
--
-- Создание: Фев 17 2014 г., 15:35
--

CREATE TABLE IF NOT EXISTS `workinorder` (
  `id_order` int(10) unsigned NOT NULL,
  `id_workinorder` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_worktype` int(11) NOT NULL COMMENT 'тип работ',
  `number_of_workers` tinyint(4) NOT NULL DEFAULT '0',
  `cost_rate` float NOT NULL DEFAULT '0' COMMENT 'ставка издержек',
  `client_rate` float NOT NULL DEFAULT '0' COMMENT 'ставка "клиент"',
  `id_metro` int(10) unsigned DEFAULT NULL,
  `id_street` int(10) unsigned DEFAULT NULL,
  `id_territorialsign` int(10) unsigned DEFAULT NULL,
  `address` varchar(512) DEFAULT NULL,
  `travel_by_train` tinyint(1) NOT NULL DEFAULT '0' COMMENT 'проезд на поезде',
  `travel_by_shuttle` tinyint(1) NOT NULL DEFAULT '0' COMMENT 'проезд на маршрутке',
  `passes` tinyint(1) NOT NULL DEFAULT '0' COMMENT 'пропуска',
  `extra_people` tinyint(1) NOT NULL DEFAULT '0' COMMENT 'Приходники',
  PRIMARY KEY (`id_workinorder`),
  UNIQUE KEY `id_workinorder_UNIQUE` (`id_workinorder`),
  KEY `fk_WorkInOrder_WorkTypes1_idx` (`id_worktype`),
  KEY `fk_WorkInOrder_Orders1_idx` (`id_order`),
  KEY `fk_WorkInOrder_Metro1_idx` (`id_metro`),
  KEY `fk_WorkInOrder_Streets1_idx` (`id_street`),
  KEY `fk_WorkInOrder_TerritorialSigns1_idx` (`id_territorialsign`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

--
-- СВЯЗИ ТАБЛИЦЫ `workinorder`:
--   `id_metro`
--       `metro` -> `id_metro`
--   `id_order`
--       `orders` -> `id_order`
--   `id_street`
--       `streets` -> `id_street`
--   `id_territorialsign`
--       `territorialsigns` -> `id_territorialsign`
--   `id_worktype`
--       `worktypes` -> `id_worktype`
--

-- --------------------------------------------------------

--
-- Структура таблицы `worktypegroups`
--
-- Создание: Фев 23 2014 г., 16:24
--

CREATE TABLE IF NOT EXISTS `worktypegroups` (
  `id_worktypegroup` int(11) NOT NULL,
  `name` varchar(128) NOT NULL,
  PRIMARY KEY (`id_worktypegroup`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `worktypes`
--
-- Создание: Фев 17 2014 г., 15:35
--

CREATE TABLE IF NOT EXISTS `worktypes` (
  `id_worktype` int(11) NOT NULL AUTO_INCREMENT,
  `short_name` varchar(45) NOT NULL,
  `name` varchar(256) NOT NULL,
  `unit` varchar(16) NOT NULL,
  `rate` float NOT NULL,
  `unit_sec` varchar(16) DEFAULT NULL,
  `rate_sec` float NOT NULL DEFAULT '0',
  `id_worktypegroup` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_worktype`),
  UNIQUE KEY `short_name_UNIQUE` (`short_name`),
  KEY `fk_WorkTypes_Units1_idx` (`unit`),
  KEY `fk_WorkTypes_Units2_idx` (`unit_sec`),
  KEY `fk_WorkTypes_WorkTypeGroups1_idx` (`id_worktypegroup`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT='Стандартный справочник типов работ' AUTO_INCREMENT=3 ;

--
-- СВЯЗИ ТАБЛИЦЫ `worktypes`:
--   `unit`
--       `units` -> `unit`
--   `unit_sec`
--       `units` -> `unit`
--   `id_worktypegroup`
--       `worktypegroups` -> `id_worktypegroup`
--

--
-- Дамп данных таблицы `worktypes`
--

INSERT INTO `worktypes` (`id_worktype`, `short_name`, `name`, `unit`, `rate`, `unit_sec`, `rate_sec`, `id_worktypegroup`) VALUES
(1, 'ш', 'шпатель-мен', 'ч', 100, NULL, 0, NULL),
(2, 'п', 'пилорез', 'ч', 50, NULL, 0, NULL);

-- --------------------------------------------------------

--
-- Структура таблицы `worktypestools`
--
-- Создание: Фев 23 2014 г., 16:24
--

CREATE TABLE IF NOT EXISTS `worktypestools` (
  `id_worktype` int(11) NOT NULL,
  `id_tool` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id_worktype`,`id_tool`),
  KEY `fk_WorkTypesTools_WorkTypes1_idx` (`id_worktype`),
  KEY `fk_WorkTypesTools_Tools1_idx` (`id_tool`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- СВЯЗИ ТАБЛИЦЫ `worktypestools`:
--   `id_tool`
--       `tools` -> `id_tool`
--   `id_worktype`
--       `worktypes` -> `id_worktype`
--

--
-- Дамп данных таблицы `worktypestools`
--

INSERT INTO `worktypestools` (`id_worktype`, `id_tool`) VALUES
(0, 9),
(0, 10);

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `accesstokens`
--
ALTER TABLE `accesstokens`
  ADD CONSTRAINT `fk_AccessTokens_ClientApps1` FOREIGN KEY (`id_clientapp`) REFERENCES `clientapps` (`id_client`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_AccessTokens_Employees1` FOREIGN KEY (`id_employee`) REFERENCES `employees` (`id_employee`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Ограничения внешнего ключа таблицы `brigades`
--
ALTER TABLE `brigades`
  ADD CONSTRAINT `fk_Brigades_NaturalPersons1` FOREIGN KEY (`id_leader`) REFERENCES `naturalpersons` (`id_naturalperson`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Ограничения внешнего ключа таблицы `contactpersons`
--
ALTER TABLE `contactpersons`
  ADD CONSTRAINT `fk_Contacts_Сontractors1` FOREIGN KEY (`id_сontractor`) REFERENCES `contractors` (`id_сontractor`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Contacts_Employee1` FOREIGN KEY (`id_employee`) REFERENCES `employees` (`id_employee`) ON UPDATE NO ACTION;

--
-- Ограничения внешнего ключа таблицы `contractors`
--
ALTER TABLE `contractors`
  ADD CONSTRAINT `fk_Contractors_Employees1` FOREIGN KEY (`id_employee`) REFERENCES `employees` (`id_employee`) ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Сontractors_AddressType1` FOREIGN KEY (`id_addresstype`) REFERENCES `addresstype` (`id_addresstype`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Сontractors_Contacts1` FOREIGN KEY (`id_main_manager`) REFERENCES `contactpersons` (`id_contactperson`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Сontractors_Contacts3` FOREIGN KEY (`id_responsible_for_documentation`) REFERENCES `contactpersons` (`id_contactperson`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Сontractors_ContractorTypes1` FOREIGN KEY (`id_contractortype`) REFERENCES `contractortypes` (`id_contractortype`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Сontractors_СonditionsOfWork1` FOREIGN KEY (`id_сonditionofwork`) REFERENCES `conditionsofwork` (`id_сonditionofwork`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Сontractors_Сontract1` FOREIGN KEY (`id_contract`) REFERENCES `files` (`id_file`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Сontractors_Holdings1` FOREIGN KEY (`id_holding`) REFERENCES `holdings` (`id_holding`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Сontractors_PaymentTerms1` FOREIGN KEY (`id_paymentterm`) REFERENCES `paymentterms` (`id_paymentterm`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Сontractors_PrepaymentTerms1` FOREIGN KEY (`id_prepaymentterm`) REFERENCES `prepaymentterms` (`id_prepaymentterm`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Сontractors_ScopeOfTheCompany1` FOREIGN KEY (`id_scopeofthecompany`) REFERENCES `scopeofthecompany` (`id_scopeofthecompany`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Ограничения внешнего ключа таблицы `contractorscontacts`
--
ALTER TABLE `contractorscontacts`
  ADD CONSTRAINT `fk_ContractorsContacts_Contacts1` FOREIGN KEY (`id_contactperson`) REFERENCES `contactpersons` (`id_contactperson`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_ContractorsContacts_Сontractors1` FOREIGN KEY (`id_сontractor`) REFERENCES `contractors` (`id_сontractor`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Ограничения внешнего ключа таблицы `contractorsnomenclature`
--
ALTER TABLE `contractorsnomenclature`
  ADD CONSTRAINT `fk_ContractorsNomenclature_Сontractors1` FOREIGN KEY (`id_сontractor`) REFERENCES `contractors` (`id_сontractor`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Ограничения внешнего ключа таблицы `contratorsmanagersadditional`
--
ALTER TABLE `contratorsmanagersadditional`
  ADD CONSTRAINT `fk_ContratorsManagers_Contacts1` FOREIGN KEY (`id_contactperson`) REFERENCES `contactpersons` (`id_contactperson`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_ContratorsManagers_Сontractors1` FOREIGN KEY (`id_сontractor`) REFERENCES `contractors` (`id_сontractor`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Ограничения внешнего ключа таблицы `files`
--
ALTER TABLE `files`
  ADD CONSTRAINT `fk_Files_Employee1` FOREIGN KEY (`id_employee`) REFERENCES `employees` (`id_employee`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Ограничения внешнего ключа таблицы `filesinorder`
--
ALTER TABLE `filesinorder`
  ADD CONSTRAINT `fk_FilesInOrder_Files1` FOREIGN KEY (`id_file`) REFERENCES `files` (`id_file`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_FilesInOrder_Orders1` FOREIGN KEY (`id_order`) REFERENCES `orders` (`id_order`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Ограничения внешнего ключа таблицы `metro`
--
ALTER TABLE `metro`
  ADD CONSTRAINT `fk_Metro_MetroBranches1` FOREIGN KEY (`id_metrobranch`) REFERENCES `metrobranches` (`id_metrobranch`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Metro_TerritorialSigns1` FOREIGN KEY (`id_territorialsign`) REFERENCES `territorialsigns` (`id_territorialsign`) ON DELETE SET NULL ON UPDATE NO ACTION;

--
-- Ограничения внешнего ключа таблицы `metrostreets`
--
ALTER TABLE `metrostreets`
  ADD CONSTRAINT `fk_MetroStreets_Metro1` FOREIGN KEY (`id_metro`) REFERENCES `metro` (`id_metro`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_MetroStreets_Streets1` FOREIGN KEY (`id_street`) REFERENCES `streets` (`id_street`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Ограничения внешнего ключа таблицы `naturalpersons`
--
ALTER TABLE `naturalpersons`
  ADD CONSTRAINT `fk_employee` FOREIGN KEY (`id_employee`) REFERENCES `employees` (`id_employee`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_leading_type_of_work` FOREIGN KEY (`id_naturalperson`, `id_leading_type_of_work`) REFERENCES `naturalpersonsworktypes` (`id_naturalperson`, `id_worktype`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Ограничения внешнего ключа таблицы `naturalpersonsemails`
--
ALTER TABLE `naturalpersonsemails`
  ADD CONSTRAINT `naturalpersonsemails_ibfk_1` FOREIGN KEY (`id_naturalperson`) REFERENCES `naturalpersons` (`id_naturalperson`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Ограничения внешнего ключа таблицы `naturalpersonsphones`
--
ALTER TABLE `naturalpersonsphones`
  ADD CONSTRAINT `naturalpersonsphones_ibfk_1` FOREIGN KEY (`id_naturalperson`) REFERENCES `naturalpersons` (`id_naturalperson`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Ограничения внешнего ключа таблицы `naturalpersonstools`
--
ALTER TABLE `naturalpersonstools`
  ADD CONSTRAINT `fk_NaturalPersonsTools_Tools1` FOREIGN KEY (`id_tool`) REFERENCES `tools` (`id_tool`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `naturalpersonstools_ibfk_1` FOREIGN KEY (`id_naturalperson`) REFERENCES `naturalpersons` (`id_naturalperson`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Ограничения внешнего ключа таблицы `naturalpersonsworktypes`
--
ALTER TABLE `naturalpersonsworktypes`
  ADD CONSTRAINT `naturalpersonsworktypes_ibfk_1` FOREIGN KEY (`id_naturalperson`) REFERENCES `naturalpersons` (`id_naturalperson`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `naturalpersonsworktypes_ibfk_2` FOREIGN KEY (`id_worktype`) REFERENCES `worktypes` (`id_worktype`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Ограничения внешнего ключа таблицы `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `fk_Orders_Сontractors1` FOREIGN KEY (`id_сontractor`) REFERENCES `contractors` (`id_сontractor`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Orders_Employees1` FOREIGN KEY (`id_employee`) REFERENCES `employees` (`id_employee`) ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Orders_PaymentTerms1` FOREIGN KEY (`id_paymentterm`) REFERENCES `paymentterms` (`id_paymentterm`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Ограничения внешнего ключа таблицы `refreshtokens`
--
ALTER TABLE `refreshtokens`
  ADD CONSTRAINT `fk_AccessTokens_ClientApps10` FOREIGN KEY (`id_clientapp`) REFERENCES `clientapps` (`id_client`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_AccessTokens_Employees10` FOREIGN KEY (`id_employee`) REFERENCES `employees` (`id_employee`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Ограничения внешнего ключа таблицы `tools`
--
ALTER TABLE `tools`
  ADD CONSTRAINT `fk_Tools_ToolGroups1` FOREIGN KEY (`id_toolgroup`) REFERENCES `toolgroups` (`id_toolgroup`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `tools_ibfk_1` FOREIGN KEY (`unit`) REFERENCES `units` (`unit`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `tools_ibfk_2` FOREIGN KEY (`unit_sec`) REFERENCES `units` (`unit`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Ограничения внешнего ключа таблицы `toolsforworkinorder`
--
ALTER TABLE `toolsforworkinorder`
  ADD CONSTRAINT `fk_ToolsForWorkInOrder_Tools1` FOREIGN KEY (`id_tool`) REFERENCES `tools` (`id_tool`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_ToolsForWorkInOrder_WorkInOrder1` FOREIGN KEY (`id_workinorder`) REFERENCES `workinorder` (`id_workinorder`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Ограничения внешнего ключа таблицы `workers`
--
ALTER TABLE `workers`
  ADD CONSTRAINT `fk_Workers_Workers1` FOREIGN KEY (`id_worker_took_the_money`) REFERENCES `workers` (`id_worker`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Workers_WorkInOrder1` FOREIGN KEY (`id_workinorder`) REFERENCES `workinorder` (`id_workinorder`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Workers_WorkTypes1` FOREIGN KEY (`id_worktype`) REFERENCES `worktypes` (`id_worktype`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Ограничения внешнего ключа таблицы `workerstools`
--
ALTER TABLE `workerstools`
  ADD CONSTRAINT `fk_WorkersTools_Tools1` FOREIGN KEY (`id_tool`) REFERENCES `tools` (`id_tool`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_WorkersTools_Workers1` FOREIGN KEY (`id_worker`) REFERENCES `workers` (`id_worker`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Ограничения внешнего ключа таблицы `workinorder`
--
ALTER TABLE `workinorder`
  ADD CONSTRAINT `fk_WorkInOrder_Metro1` FOREIGN KEY (`id_metro`) REFERENCES `metro` (`id_metro`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_WorkInOrder_Orders1` FOREIGN KEY (`id_order`) REFERENCES `orders` (`id_order`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_WorkInOrder_Streets1` FOREIGN KEY (`id_street`) REFERENCES `streets` (`id_street`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_WorkInOrder_TerritorialSigns1` FOREIGN KEY (`id_territorialsign`) REFERENCES `territorialsigns` (`id_territorialsign`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_WorkInOrder_WorkTypes1` FOREIGN KEY (`id_worktype`) REFERENCES `worktypes` (`id_worktype`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Ограничения внешнего ключа таблицы `worktypes`
--
ALTER TABLE `worktypes`
  ADD CONSTRAINT `fk_WorkTypes_Units1` FOREIGN KEY (`unit`) REFERENCES `units` (`unit`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_WorkTypes_Units2` FOREIGN KEY (`unit_sec`) REFERENCES `units` (`unit`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_WorkTypes_WorkTypeGroups1` FOREIGN KEY (`id_worktypegroup`) REFERENCES `worktypegroups` (`id_worktypegroup`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Ограничения внешнего ключа таблицы `worktypestools`
--
ALTER TABLE `worktypestools`
  ADD CONSTRAINT `fk_WorkTypesTools_Tools1` FOREIGN KEY (`id_tool`) REFERENCES `tools` (`id_tool`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_WorkTypesTools_WorkTypes1` FOREIGN KEY (`id_worktype`) REFERENCES `worktypes` (`id_worktype`) ON DELETE NO ACTION ON UPDATE NO ACTION;
SET FOREIGN_KEY_CHECKS=1;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
