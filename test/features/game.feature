
Feature: Slot game

	Tests for a simple slot game that will display different messages to a user depending on the matching tiles count


	# Scenario: Open game page and verify all sections and controls are present

	# 	Given I open "http://127.0.0.1:4444/" url
	# 	# Check header
	# 	Then game header message should contain text "Welcome"
	# 	# Check spin button
	# 	Then button spin should be present
	# 	When I click button spin
	# 	# Check tiles
	# 	Then tile number 1 should be present
	# 	And tile number 2 should be present
	# 	And tile number 3 should be present
	# 	And I take a screenshot


	# Scenario: Verify that spin with no matching tiles will display a loose message

	# 	When I spin to get not matching tiles
	# 	Then game header message should contain text "No Win, try again."


	# Scenario: Verify that spin with two matching tiles will display a small win message

	# 	When I spin to get two matching tiles
	# 	Then game header message should contain text "Small win, try again to win more."


	# Scenario: Verify that spin with all matching tiles will display a big win message

	# 	When I spin to get all matching tiles
	# 	Then game header message should contain text "Big win, congratulation."


	Scenario: Dummy google test


		Given I open "http://google.com" url