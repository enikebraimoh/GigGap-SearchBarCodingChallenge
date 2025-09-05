# GigGap SearchBar Coding Challenge

A React Native application that demonstrates a search functionality for categories and users with debounced search and grouped results display.

## Demo Video

![Demo GIF](./video.gif)

## Features

- **Search Bar**: Input field that triggers search after 3+ characters
- **Debounced Search**: 300ms delay to prevent excessive searches
- **Dual Results**: Separate sections for matching usernames and categories
- **Case-insensitive Search**: Works regardless of input case

## Search Examples

- Type "pai" → Shows: `best_painter` (Usernames) and `Painter`, `Car Painter` (Categories)
- Type "car" → Shows: `no_1_car_mechanic` (Usernames) and `Carpenter`, `Car Painter` (Categories)
- Type "carp" → Shows: `Carpenter` (Categories only)


## Technical Details

- **React Native Version**: 0.72.9
- **Search Algorithm**: Case-insensitive substring matching
- **Debouncing**: 300ms delay to prevent excessive searches
- **Results Display**: SectionList with grouped results



