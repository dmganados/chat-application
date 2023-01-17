# Import datetime so that it can be
# used to compute a person's age.
from datetime import datetime


def main():
    # Get the user's gender, birthdate, height, and weight.
    gender = input("Please enter your gender (M or F): ").upper()
    birthdate = input("Enter your birthdate (YYYY-MM-DD): ")
    weight = float(input("Enter your weight in U.S. pounds: "))
    height = float(input("Enter you height in U.S. inches: "))
    
    # Call the compute_age, kg_from_lb, cm_from_in,
    # body_mass_index, and basal_metabolic_rate functions
    # as needed.
    age = compute_age(birthdate)
    weight = kg_from_lb(weight)
    height = cm_from_in(height)
    bmi = body_mass_index(weight, height)
    bmr = basal_metabolic_rate(gender, weight, height, age)
    
    # Print the results for the user to see.
    print(f"Age (years): {age}")
    print(f"Weight (kg): {weight}")
    print(f"Height (cm): {height}")
    print(f"Body mass index: {bmi}")
    print(f"Basal metabolic rate (kcal/day): {bmr}")
    pass


def compute_age(birth_str):
    """Compute and return a person's age in years.
    Parameter birth_str: a person's birthdate stored
        as a string in this format: YYYY-MM-DD
    Return: a person's age in years.
    """
    # Convert a person's birthdate from a string
    # to a date object.
    birthdate = datetime.strptime(birth_str, "%Y-%m-%d")
    today = datetime.now()

    # Compute the difference between today and the
    # person's birthdate in years.
    years = today.year - birthdate.year

    # If necessary, subtract one from the difference.
    if birthdate.month > today.month or \
        (birthdate.month == today.month and \
            birthdate.day > today.day):
        years -= 1

    return years


def kg_from_lb(pounds):
    """Convert a mass in pounds to kilograms.
    Parameter pounds: a mass in U.S. pounds.
    Return: the mass in kilograms.
    """
    # To convert the lbs to kg multiply lbs by 0.453592
    # After converting round the number to the 2nd digit from decimal point
    convert_mass = round(pounds * 0.453592, 2)    

    return convert_mass


def cm_from_in(inches):
    """Convert a length in inches to centimeters.
    Parameter inches: a length in inches.
    Return: the length in centimeters.
    """
    # Convert in to cm by multiplying in to 2.54
    # Round the value to the first digit from decimal point
    convert_length = round(inches * 2.54, 1)
   
    return convert_length


def body_mass_index(weight, height):
    """Compute and return a person's body mass index.
    Parameters
        weight: a person's weight in kilograms.
        height: a person's height in centimeters.
    Return: a person's body mass index.
    """
    bmi = round((10000 * weight) / height**2, 1)
    
    return bmi


def basal_metabolic_rate(gender, weight, height, age):
    """Compute and return a person's basal metabolic rate.
    Parameters
        weight: a person's weight in kilograms.
        height: a person's height in centimeters.
        age: a person's age in years.
    Return: a person's basal metabolic rate in kcals per day.
    """
    if gender == "F":
        bmr = round(447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age))
        return bmr
    elif gender == "M":
        bmr = round(88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age))
        return bmr
    else:
        return("Invalid input. Enter correct input for gender")

# Call the main function so that
# this program will start executing.
main()
