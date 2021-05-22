CREATE TABLE LocationCompany
    (
        CompanyCode                    VARCHAR(2)    NOT NULL,
        Label                          VARCHAR(50)   NOT NULL,
        ManagerWorkerNumber          VARCHAR(10)   NOT NULL,
CONSTRAINT pkLocationCompany PRIMARY KEY 
    (
        CompanyCode
    ));

/****************************************************************/

CREATE TABLE LocationOffice
    (
        CompanyCode                    VARCHAR(2)    NOT NULL,
        OfficeCode                     VARCHAR(2)    NOT NULL,
        Label                          VARCHAR(50)   NOT NULL,
        ManagerWorkerNumber          VARCHAR(10)   NOT NULL,
CONSTRAINT pkLocationOffice PRIMARY KEY 
    (
        CompanyCode, 
        OfficeCode
    ));

/****************************************************************/

CREATE TABLE LocationGroup
    (
        CompanyCode                    VARCHAR(2)    NOT NULL,
        OfficeCode                     VARCHAR(2)    NOT NULL,
        GroupCode                      VARCHAR(2)    NOT NULL,
        Label                          VARCHAR(100)   NOT NULL,
        ManagerWorkerNumber          VARCHAR(10)   NOT NULL,
CONSTRAINT pkLocationGroup PRIMARY KEY
    (
        CompanyCode,
        OfficeCode,
        GroupCode
    ));

/****************************************************************/

CREATE TABLE LocationPhysical
    (
        PhysicalLocationId             VARCHAR(20)   NOT NULL,
        Label                          VARCHAR(100)  NOT NULL,
        SortValue                      VARCHAR(100)  NOT NULL,
CONSTRAINT pkLocationPhysical PRIMARY KEY
    (
        PhysicalLocationId
    ));

/****************************************************************/

CREATE TABLE SkillCategory
    (
        SkillCategoryId                VARCHAR(32)   NOT NULL,
        Label                          VARCHAR(100)  NOT NULL,
        SortValue                      VARCHAR(10)   NOT NULL,
CONSTRAINT pkSkillCategory PRIMARY KEY
    (
        SkillCategoryId
    ));

/****************************************************************/

CREATE TABLE Skill
    (
        SkillCategoryId                VARCHAR(32)   NOT NULL,
        SkillId                        VARCHAR(32)   NOT NULL,
        Label                          VARCHAR(100)  NOT NULL,
        SortValue                      VARCHAR(10)   NOT NULL,
CONSTRAINT pkSkill PRIMARY KEY
    (
        SkillCategoryId,
        SkillId
    ));

/****************************************************************/

CREATE TABLE Worker
    (
        WorkerNumber                 VARCHAR(10)   NOT NULL,
        CompanyCode                    VARCHAR(2)    NOT NULL,
        OfficeCode                     VARCHAR(2)    NOT NULL,
        GroupCode                      VARCHAR(2)    NOT NULL,
        LastName                       VARCHAR(50),
        FirstName                      VARCHAR(25),
        EmploymentType                 VARCHAR(10),
        Title                          VARCHAR(100),
        HireDate                       DATE,
        TerminationDate                DATE,
        SupervisorWorkerNumber       VARCHAR(10)   NOT NULL,
        YearsPriorExperience           NUMERIC(3,1),
        Email                          VARCHAR(50),
        WorkPhone                      VARCHAR(24),
        WorkCell                       VARCHAR(24),
        PhysicalLocationId             VARCHAR(20)   NOT NULL,
        PhotoUrl                       VARCHAR(255),
        Type                           VARCHAR(15)   CHECK (Type IN('employee', 'contractor')),               
CONSTRAINT pkWorker PRIMARY KEY
    (
        WorkerNumber
    ));

/****************************************************************/

CREATE TABLE WorkerSkill
    (
        WorkerNumber                 VARCHAR(10)   NOT NULL,
        SkillCategoryId                VARCHAR(32)   NOT NULL,
        SkillId                        VARCHAR(32)   NOT NULL,
        SkillLevel                     VARCHAR(12)   NOT NULL CHECK (SkillLevel IN('novice', 'intermediate', 'expert')),
CONSTRAINT pkWorkerSkill PRIMARY KEY
    (
        WorkerNumber,
        SkillCategoryId,
        SkillId
    ));

/****************************************************************/

CREATE TABLE [User]
    (
        UserId                 VARCHAR(3)   NOT NULL,
        Username                VARCHAR(20)   NOT NULL,
        Email                   VARCHAR(100),
        Salt                    VARCHAR(100),
        Hash                    VARCHAR(256),
CONSTRAINT pkUser PRIMARY KEY
    (
        UserId
    ));