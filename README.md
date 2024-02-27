# features

display store data if data available, can move to any step if data available, display face then item image then code at preview with show all details button, preview should not be disabled

## Image handling

compress image to 100kb befoe saving

save image inside folder `ProgramId/SewadarId/A_random_number.jpg`
save image inside folder `ProgramId/SewadarId/F_random_number.jpg`
save image inside folder `ProgramId/SewadarId/B_random_number.jpg`

## Enable Next Button

Step-1: Without profile pic Next button will not be highlighted
Step-2: Disable Next button when item count = 0
Step-3: Without uploading front pic Next button will not be highlighted

## Features

Add Laptop, Bag in items form
User label for textbox with cart like + - buttons in Step-2

## login

Mobile number will be unique
userid: phone
password: dob (ddmmyyyy)

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

### Meeting 27-Feb-2024

Add a homepage with buttons
Step-1: Make height 100% use full frame
Step-2: Change order of items
Step-3: Increasee height of both the frames
Loading at login screen
Pass login info to header and while saving
