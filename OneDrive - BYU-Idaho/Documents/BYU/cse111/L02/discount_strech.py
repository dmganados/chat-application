# Import datetime library to use day and date
from datetime import datetime

# Get and display the computer's day, date, and time 
date = datetime.now()
day = date.strftime("%A")
# day = "Monday"
print(f"Today is {day}, {date}")

if day == "Tuesday" or day == "Wednesday":
    print(f"It's {day}!\nHey, do you know you can avail a 10% discount if you purchase a total of $50 and above?")
    print("Avail a 10% discount now!")

# # Ask user of the item's price
# price = float(input("Please enter the price: "))
# for items in price:
#     if items == 0:
#         break
#     print(price)

# Create a loop that will ask the user of the price and quantity
subtotal = []
total_items = []

def purchase():
    price = float(input("Please enter the price: "))
    quantity = int(input("Enter the quantity: "))
    while price != 0 and quantity != 0:
        compute = round(price * quantity, 2)
        subtotal.append(compute)

purchase()



# To quit the loop the user will just type 0