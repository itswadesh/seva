======================== Logic ========================
files in `programID/SewadarID, Back-.png, Front-.png, Face-.png`
==================================== Start Pending Tasks ==========================================

- `admin/users` -> A button to inactive all records
  -> Each line will have checkbox to approve a user
- `admin/program-list -> This status will be available in the collection screen (Indicates if the collection is for DEMO or LIVE)
  1 DEMO Active

2. LIVE Active

- `/auth/signup` -> After registration is complete, the success page should show the following message
  `Please wait for activation`
- `/auth/login` -> If the user is not active, the make pending_approval=true
- `admin/login-requests` -> List of users trying to login and bulk approve all them by selecting checkboxes. This receives data where pending_approval=true

### Image handling

compress image to 100kb befoe saving

save image inside folder `ProgramId/SewadarId/A_random_number.jpg`
save image inside folder `ProgramId/SewadarId/F_random_number.jpg`
save image inside folder `ProgramId/SewadarId/B_random_number.jpg`

==================================== End Pending Tasks ==========================================

# Steps

D:/seva
Right click and open with VSCODE

Press Ctrl+` and Run the following commands

```
pnpm i
pnpm dev
```

## Enable Next Button

Step-1: Without profile pic Next button will not be highlighted
Step-2: Disable Next button when item count = 0
Step-3: Without uploading front pic Next button will not be highlighted

## Features

display store data if data available, can move to any step if data available, display face then item image then code at preview with show all details button, preview should not be disabled
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


Meeting Notes
------------------

ONLY WINDOW/BACKUP/PLANNING/ADMIN are allowed to login

If active=false. then active_datetime_request = currentdate()

day end inactive all (even if programs goes for 3 days)

Login Screen
----------------
"Username, password not correct"
"Please wait for approval" - 1 time approval
"Please wait for activation" - every day


Clicking dispute will take to dispute option page
Face mis-match
Already collected
Items dispute
Others (textbox)

