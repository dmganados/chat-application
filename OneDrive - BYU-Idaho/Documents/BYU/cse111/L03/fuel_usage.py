def main():
    # Get an odometer value in U.S. miles from the user.
    first_odometer = float(input('Enter the first odometer reading (miles): '))

    # Get another odometer value in U.S. miles from the user.
    second_odometer = float(input('Enter the second odometer reading (miles): '))

    # Get a fuel amount in U.S. gallons from the user.
    fuel_amount = float(input('Enter the amount of fuel used (gallons): '))

    # Call the miles_per_gallon function and store
    # the result in a variable named mpg.
    mpg = miles_per_gallon(first_odometer, second_odometer, fuel_amount)

    # Call the lp100k_from_mpg function to convert the
    # miles per gallon to liters per 100 kilometers and
    # store the result in a variable named lp100k.
    lp100k = lp100k_from_mpg(mpg)

    # Display the results for the user to see.
    print(f"{mpg:.2f} miles per gallon");
    print(f"{lp100k:.2f} liters per 100 kilometers")
    pass


def miles_per_gallon(start_miles, end_miles, amount_gallons):
    """Compute and return the average number of miles
    that a vehicle traveled per gallon of fuel.

    Parameters
        start_miles: An odometer value in miles.
        end_miles: Another odometer value in miles.
        amount_gallons: A fuel amount in U.S. gallons.
    Return: Fuel efficiency in miles per gallon.
    """
    fuel_efficiency = (end_miles - start_miles) / amount_gallons

    return fuel_efficiency


def lp100k_from_mpg(mpg):
    """Convert miles per gallon to liters per 100
    kilometers and return the converted value.

    Parameter mpg: A value in miles per gallon
    Return: The converted value in liters per 100km.
    """
    convert_mpg = 235.215 / mpg

    return convert_mpg


# Call the main function so that
# this program will start executing.
main()