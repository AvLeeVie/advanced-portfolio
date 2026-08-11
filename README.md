This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Ren'Py Scene Snippet

The following Ren'Py code can be used to create a space scene with moving stars, galaxy, and fog effects:

```renpy
# Can be used in scenarios like imaginations, outside the window in Act 3, or anything you like.
# To run the code, simply type this:
## call space
## with dissolve (or replace it with any transitions or none.)
# to hide it, just simply change the scene to anything.

image stars:
    "images/cg/monika/mask_2.png"
    additive 1 xtile 3
image galaxy:
    "images/cg/monika/mask_3.png"
    xtile 3 subpixel True
    block:
        xoffset 1280
        linear 180 xoffset 0
        repeat
image fog:
    "images/cg/monika/mask.png"
    xtile 3 additive 1

label space:
    scene black
    show galaxy:
        truecenter
        ycenter 300
    show stars as m3:
        subpixel True
        xcenter 640 ycenter 360
        zoom 1 alpha 0.35
        block:
            xcenter 640
            linear 120 xcenter -640
            repeat
    show stars as m2:
        subpixel True
        xcenter 640 ycenter 360
        zoom 1.5 alpha 0.5 xzoom -1
        block:
            xcenter 640
            linear 105 xcenter -1280
            repeat
    show stars as m1:
        subpixel True
        xcenter 640 ycenter 360
        zoom 2 alpha 0.65
        block:
            xcenter 640
            linear 90 xcenter -1920
            repeat
    show fog:
        subpixel True
        xcenter 640 ycenter 360 zoom 1 alpha 0.15
        block:
            xcenter 640
            linear 25 xcenter -640
            repeat
    show vignette:
        alpha 0.25
    return
```
