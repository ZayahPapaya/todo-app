# todo-app

[x] - componentize stuff
[] - use context for settings: display/hide completed items bool, number of items to display per screen, default sort field, hardcode settings for now.
[] - utilize the context values. List component should be pages with a max length. Hide/show completed items. OPTIONAL: Sort items based on the inputs (ie difficulty sort);

Display n items in list where n is  number to display in context.
If you have more than n items in list, add a button "Next ->" that will replace the list with the next n items in list.
If  you are past first n items (on page 2+) add a button "<- Previous" that will replace list with previous n items in list.

Stretch:
Convert components to functional(lol?)
In context, read settings from Local Storage and use that as initial state. (What)

Test above.

# Documentation

[] - Describe how global state is consumed by components
[] - Describe the operation of the hook: useForm()
