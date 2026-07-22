# Class Focus Friend

Class Focus Friend is a shared classroom focus tool that helps students build stamina for staying on task. It gives a whole class a friendly, visual reason to focus during independent work, while giving teachers a simple timer and noise meter to support classroom routines.

It is inspired by [Focus Friend](https://www.yourfocusfriend.com/), refreshed for a new school year and designed for use on a classroom display, such as a projector or TV.

## The Classroom Need

During activities such as an independent math warm-up, students may struggle to stay quiet and focused for the full work period. A regular timer can show how much time is left, but it does not always give students a reason to keep going.

Class Focus Friend turns a focus session into a shared goal. When the class completes a session, their character earns points that can be used to unlock clothes and accessories. The noise meter also helps the class notice whether the room matches the kind of work they are doing.

## Who It Helps

- **Students:** Build focus stamina and tolerance for working independently for five, ten, or more minutes.
- **Teachers:** Use a motivating whole-class routine and a visible noise meter for classroom management.
- **Substitute teachers:** Start a familiar focus routine without relying on one teacher's personal device.

## MVP: The First Version

The first version keeps the experience simple and useful for one classroom. It saves classroom progress on the current device and does not use teacher or student accounts.

- A shared focus-session timer where the teacher can enter a session length in minutes, save a named setup as a favorite, and return to favorites for future sessions.
- A classroom character that earns points when a focus session is completed.
- A point shop where the character can get clothes and accessories.
- A noise meter with adjustable sensitivity for the selected type of work:
  - Independent or silent work
  - Partner work
- When the room becomes too loud, the timer pauses automatically. It resumes when the room is back on track, and the teacher can still pause or reset the session manually.
- A history of previous focus sessions.
- A display designed to be shared with the whole class.

## A Typical Session

1. The teacher selects the type of work and enters a focus-session length, or chooses a saved favorite.
2. The class watches the timer and noise meter while they work. If the room becomes too loud, the timer pauses until the sound level returns to the goal.
3. When the session is completed, the class earns points for its character.
4. The class can use earned points to personalize the character over time.

## Later Ideas

These are valuable possibilities, but are not needed for the first version:

- Support for multiple class sections.
- Easy display options for a TV or Roku through HDMI or AirPlay.
- A choice to use silence or calming background audio.
- A selectable or integrated calming lofi YouTube video for the background.

## Project Principles

- Keep the classroom experience quick to start and easy to understand.
- Motivate the whole class without relying on physical rewards.
- Make the noise meter useful for different learning situations, not only silent work.
- Keep the first version focused on one classroom before adding more complex options.

## Local Setup and Development

You will need [Bun](https://bun.sh/) installed on your computer.

1. In this project folder, install the project tools:

   ```bash
   bun install
   ```

2. Start the app for local development:

   ```bash
   bun run dev
   ```

3. Open the local address shown in your terminal to view the app.

There are no environment variables or configuration files required for the current version of the app.

To create a production build, run:

```bash
bun run build
```
