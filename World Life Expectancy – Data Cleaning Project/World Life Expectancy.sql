-- Remove duplicate row
SELECT * 
FROM world_life_expectancy
;

SELECT country, Year, CONCAT(country, year), COUNT(CONCAT(country, year))
FROM world_life_expectancy
GROUP BY country, Year, CONCAT(country, year)
HAVING COUNT(CONCAT(country, year)) > 1
;

SELECT Row_ID, 
	CONCAT(country, year),
    ROW_NUMBER() OVER(PARTITION BY CONCAT(country, year) ORDER BY CONCAT(country, year)) as Row_Num
FROM world_life_expectancy
;

SELECT *
FROM(
	SELECT Row_ID, 
		CONCAT(country, year),
		ROW_NUMBER() OVER(PARTITION BY CONCAT(country, year) ORDER BY CONCAT(country, year)) as Row_Num
	FROM world_life_expectancy
) AS Row_Table
WHERE Row_Num > 1
;
DELETE FROM world_life_expectancy
WHERE Row_ID IN (
	SELECT Row_ID
	FROM(
		SELECT Row_ID, 
			CONCAT(country, year),
			ROW_NUMBER() OVER(PARTITION BY CONCAT(country, year) ORDER BY CONCAT(country, year)) as Row_Num
		FROM world_life_expectancy
	) AS Row_Table
WHERE Row_Num > 1
)
;
-- Update Status
SELECT * 
FROM world_life_expectancy
WHERE Status = ''
;

SELECT * 
FROM world_life_expectancy
WHERE Status IS NOT NULL
;

SELECT DISTINCT(Status)
FROM world_life_expectancy
WHERE Status <> ''
;

SELECT DISTINCT(Country)
FROM world_life_expectancy
WHERE Status = 'Developing'
;

UPDATE world_life_expectancy -- error
SET Status = 'Developing'
WHERE Country IN (
	SELECT DISTINCT(Country)
	FROM world_life_expectancy
	WHERE Status = 'Developing'
)
;

UPDATE world_life_expectancy t1
JOIN world_life_expectancy t2
	ON t1.Country = t2.Country
SET t1.Status = 'Developed'
WHERE t1.Status = ''
AND t2.Status <> ''
AND t2.Status = 'Developed'
;

-- Update `Lifeexpectancy`
SELECT Country, Year, `Lifeexpectancy`
FROM world_life_expectancy
WHERE `Lifeexpectancy` = '' 
;

SELECT t1.Country, t1.Year, t1.`Lifeexpectancy`, 
	t2.Country, t2.Year, t2.`Lifeexpectancy`,
    t3.Country, t3.Year, t3.`Lifeexpectancy`,
    ROUND(( t2.`Lifeexpectancy` + t3.`Lifeexpectancy` ) / 2, 1)
FROM world_life_expectancy t1
JOIN world_life_expectancy t2
	ON t1.Country = t2.Country
    AND t1.Year = t2.Year - 1
JOIN world_life_expectancy t3
	ON t1.Country = t3.Country
    AND t1.Year = t3.Year + 1
WHERE t1.`Lifeexpectancy` = ''
;

UPDATE world_life_expectancy t1
JOIN world_life_expectancy t2
	ON t1.Country = t2.Country
    AND t1.Year = t2.Year - 1
JOIN world_life_expectancy t3
	ON t1.Country = t3.Country
    AND t1.Year = t3.Year + 1
SET t1.`Lifeexpectancy` = ROUND(( t2.`Lifeexpectancy` + t3.`Lifeexpectancy` ) / 2, 1)
WHERE t1.`Lifeexpectancy` = ''
;