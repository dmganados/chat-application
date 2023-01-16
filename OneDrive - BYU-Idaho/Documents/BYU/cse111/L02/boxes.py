# Import math module to use math.ceil() later
import math

# Get the user input. The input must be whole numbers
# so I will use int().
products = int(input("Enter the number of items: "))
box = int(input("Enter the number of items per box: "))

# Compute the number or items that can fit in a box and wrap inside math.ceil() to 
# round the number to the nearest integer.
compute = math.ceil(products / box)

# Blank line
print()

# Display result for the user to see.
print(f"For {products} items, packing {box} in a box, you will need {compute} boxes.")