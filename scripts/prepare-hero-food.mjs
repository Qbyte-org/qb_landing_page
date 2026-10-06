import { createRequire } from "node:module";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Keep the source photographs intact. These hand-traced alpha masks retain the
// actual food pixels; there is no generated food, uniform circular crop or frame.
// Resolve Next's existing sharp dependency instead of adding a processing tool.
const require = createRequire(import.meta.url);
const sharp = createRequire(require.resolve("next/package.json"))("sharp");
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sourceDirectory = path.join(root, "public/images/food/pinterest");
const destinationDirectory = path.join(root, "public/images/food/hero-cutouts");
const canvasSize = 1200;

const foods = [
  {
    name: "jollof",
    source: "jollof-chicken-plantain",
    removeNeutralRim: true,
    // Rice extends beyond the original photograph's right edge. That edge is
    // intentionally preserved rather than inventing the missing food pixels.
    paths: ["M 531 33 C 546 28 554 53 557 85 L 592 68 Q 628 64 640 105 L 653 127 Q 681 123 696 165 Q 727 169 744 190 L 751 218 Q 788 153 817 190 Q 846 209 826 252 L 809 268 Q 856 264 864 296 Q 866 322 839 343 Q 895 348 917 365 L 951 375 965 390 1000 407 1009 424 1043 444 1057 472 1080 485 L 1080 953 Q 1075 987 1053 1002 L 1007 1025 999 1040 968 1048 952 1071 922 1073 917 1094 900 1098 886 1078 849 1074 824 1060 791 1061 765 1044 741 1045 Q 775 1097 760 1157 L 777 1201 755 1208 745 1233 711 1244 680 1242 Q 632 1262 568 1245 Q 484 1252 400 1224 L 347 1214 331 1200 290 1192 273 1170 243 1140 240 1118 Q 204 1106 209 1069 L 205 1027 214 985 Q 169 976 146 940 L 137 902 122 872 119 830 106 786 109 741 Q 86 693 100 647 Q 83 608 92 574 L 79 555 91 526 86 501 101 482 116 480 122 455 160 440 183 451 189 471 207 471 229 483 251 479 284 502 312 472 Q 260 489 229 466 Q 216 449 237 423 L 269 381 Q 238 393 223 381 L 199 353 163 353 150 337 174 319 197 304 234 293 Q 220 267 235 233 Q 278 187 326 152 Q 351 111 398 88 Q 465 54 531 33 Z"],
  },
  {
    name: "ofada",
    source: "ofada-rice-ayamase",
    paths: [
      "M 659 72 C 889 57 1120 190 1122 377 C 1121 523 1012 635 850 687 Q 785 710 676 714 Q 739 667 800 678 Q 899 673 979 720 L 1000 753 1020 764 1020 795 1044 813 1049 849 1075 866 1084 911 1107 919 1112 952 1123 973 L 1123 1090 1100 1101 1098 1136 1070 1148 1058 1176 1021 1176 1006 1199 971 1211 940 1204 907 1229 878 1225 865 1234 840 1219 809 1230 794 1210 753 1215 731 1199 709 1206 692 1184 670 1194 658 1174 632 1182 610 1157 592 1163 584 1130 551 1147 530 1141 527 1163 497 1168 476 1181 457 1179 438 1203 418 1204 403 1224 381 1221 363 1229 344 1210 321 1214 304 1200 279 1207 261 1187 239 1192 224 1177 204 1182 185 1163 162 1168 143 1146 122 1149 108 1129 82 1130 69 1107 47 1109 39 1086 18 1088 15 1065 1 1062 1 1044 15 1025 1 1011 8 987 0 969 4 944 31 929 24 909 53 891 49 869 76 850 79 822 100 816 105 788 128 777 147 747 176 748 202 723 229 724 252 699 280 706 298 684 322 691 341 681 369 691 393 685 421 704 449 706 471 725 499 734 515 758 539 768 549 792 574 801 578 828 596 843 599 878 620 892 623 925 640 933 Q 632 887 648 854 L 670 802 692 759 Q 523 762 414 707 C 271 665 177 564 181 406 C 182 208 408 86 659 72 Z",
    ],
  },
  {
    name: "pounded-yam",
    source: "pounded-yam-greens",
    // Follow the photographed plate's perspective, including the herb at top.
    paths: ["M 384 215 Q 418 212 443 216 L 444 209 453 211 459 225 C 626 246 745 422 747 574 C 750 781 574 934 380 937 C 181 940 6 802 7 579 C 8 389 186 216 384 215 Z"],
  },
  {
    name: "pepper-soup",
    source: "assorted-meat-pepper-soup",
    // The square bowl is cropped in the source, so isolate its meat and herbs.
    paths: ["M 349 101 L 363 99 369 118 389 135 399 156 423 167 445 190 448 207 474 212 493 220 527 220 556 243 560 270 580 278 595 270 624 285 628 308 624 335 646 356 661 383 666 426 674 444 665 473 671 493 654 514 626 521 642 550 650 584 675 603 672 627 650 641 634 661 606 680 582 692 550 688 523 702 495 694 475 677 449 682 433 667 402 677 389 686 382 709 399 725 412 749 439 766 451 791 477 814 476 840 464 854 465 873 449 893 431 899 407 887 394 896 372 880 356 884 337 860 313 860 297 846 274 852 252 839 221 852 195 850 174 863 149 851 126 854 101 840 84 821 79 798 89 776 97 752 123 742 125 719 143 704 136 678 111 687 84 674 59 686 39 675 20 650 18 624 28 593 38 569 29 551 31 526 25 508 37 489 35 463 47 451 50 427 67 425 65 405 88 404 85 377 100 355 112 336 103 314 95 284 95 256 109 228 125 206 142 188 173 184 189 196 214 199 240 189 251 176 277 169 292 154 317 146 337 120 Z"],
  },
];

const pastryPieces = {
  akara: {
    source: "akara-bean-cakes",
    parts: [
      { path: "M 291 21 Q 310 9 338 14 L 369 12 397 23 423 39 454 52 Q 468 87 449 125 Q 429 179 381 222 Q 326 281 244 326 Q 203 352 165 341 Q 123 331 105 296 Q 91 270 103 236 L 126 197 152 165 175 144 182 125 207 109 223 86 253 73 270 49 Z", width: 670, left: 84, top: 37, rotate: -12 },
      { path: "M 474 193 Q 526 191 575 220 Q 621 242 646 281 Q 673 321 660 374 Q 653 405 628 441 Q 613 490 587 540 Q 550 598 501 632 Q 458 661 412 666 Q 362 660 327 634 Q 285 608 273 566 Q 260 527 274 482 Q 267 451 278 416 Q 278 371 296 341 Q 316 308 337 283 Q 374 232 420 213 Q 449 195 474 193 Z", width: 616, left: 473, top: 293, rotate: 9 },
      { path: "M 672 790 Q 725 780 764 797 L 799 820 Q 831 839 848 876 Q 867 914 853 957 Q 840 1005 804 1042 Q 765 1087 724 1116 Q 684 1152 639 1173 Q 602 1189 567 1176 Q 529 1161 507 1132 Q 485 1106 478 1071 Q 471 1030 486 990 L 507 942 Q 506 908 532 880 Q 558 850 594 831 Q 630 805 672 790 Z", width: 566, left: 104, top: 607, rotate: -7 },
    ],
  },
  "puff-puff": {
    source: "puff-puff",
    parts: [
      { path: "M 367 24 Q 407 15 433 44 Q 456 71 458 121 Q 459 162 433 190 Q 411 214 377 214 Q 338 205 315 177 Q 292 150 293 115 Q 292 81 310 56 Q 333 28 367 24 Z", width: 516, left: 65, top: 71, rotate: -16 },
      { path: "M 532 23 Q 571 19 602 46 Q 627 67 632 109 Q 633 135 617 148 Q 591 151 568 169 Q 535 175 503 167 Q 475 158 465 131 Q 455 101 466 71 Q 483 30 532 23 Z", width: 536, left: 561, top: 183, rotate: 22 },
      { path: "M 633 583 Q 664 583 688 607 Q 714 637 723 680 Q 731 718 717 751 Q 706 778 684 800 Q 662 830 633 840 Q 598 847 571 825 Q 546 805 538 771 Q 528 738 537 704 Q 537 671 556 645 Q 567 620 592 608 Q 610 585 633 583 Z", width: 640, left: 410, top: 370, rotate: -7 },
    ],
  },
};

function roundedOutline(outline) {
  const tokens = outline.match(/[MLQCZ]|-?\d+(?:\.\d+)?/g);
  const points = [];
  let command = "M";
  let index = 0;
  let current = [0, 0];
  const point = () => [Number(tokens[index++]), Number(tokens[index++])];
  while (index < tokens.length) {
    if (/^[MLQCZ]$/.test(tokens[index])) command = tokens[index++];
    if (command === "Z") break;
    if (command === "M" || command === "L") {
      current = point();
      points.push(current);
      command = "L";
    } else {
      const start = current;
      const control = point();
      const control2 = command === "C" ? point() : null;
      const end = point();
      const steps = command === "C" ? 18 : 12;
      for (let step = 1; step <= steps; step++) {
        const t = step / steps;
        const r = 1 - t;
        current = [0, 1].map((axis) => control2
          ? r ** 3 * start[axis] + 3 * r ** 2 * t * control[axis] + 3 * r * t ** 2 * control2[axis] + t ** 3 * end[axis]
          : r ** 2 * start[axis] + 2 * r * t * control[axis] + t ** 2 * end[axis]);
        points.push(current);
      }
    }
  }
  const corners = points.map((value, cornerIndex) => {
    const previous = points[(cornerIndex + points.length - 1) % points.length];
    const next = points[(cornerIndex + 1) % points.length];
    const incoming = Math.hypot(value[0] - previous[0], value[1] - previous[1]);
    const outgoing = Math.hypot(next[0] - value[0], next[1] - value[1]);
    const radius = Math.min(8, incoming / 3, outgoing / 3);
    const before = value.map((coordinate, axis) => coordinate - (coordinate - previous[axis]) * radius / (incoming || 1));
    const after = value.map((coordinate, axis) => coordinate + (next[axis] - coordinate) * radius / (outgoing || 1));
    return { before, value, after };
  });
  return corners.map(({ before, value, after }, cornerIndex) =>
    `${cornerIndex === 0 ? "M" : "L"} ${before.join(" ")} Q ${value.join(" ")} ${after.join(" ")}`,
  ).join(" ") + " Z";
}

async function maskedPixels(source, shape, removeNeutralRim = false) {
  const input = path.join(sourceDirectory, `${source}.webp`);
  const { width, height } = await sharp(input).metadata();
  const mask = await sharp(Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"><path fill="white" d="${roundedOutline(shape)}"/></svg>`))
    .blur(0.5)
    .png()
    .toBuffer();
  let cutout = await sharp(input)
    .ensureAlpha()
    .composite([{ input: mask, blend: "dest-in" }])
    .png()
    .toBuffer();

  if (removeNeutralRim) {
    // Remove only neutral black plate pixels connected to the outside of the
    // traced jollof silhouette. Its coloured, charred chicken pixels stay intact.
    const { data, info } = await sharp(cutout).raw().toBuffer({ resolveWithObject: true });
    const visited = new Uint8Array(width * height);
    const queue = new Uint32Array(width * height);
    let next = 0;
    let end = 0;
    for (let pixel = 0; pixel < visited.length; pixel++) {
      if (data[pixel * 4 + 3] === 0) {
        visited[pixel] = 1;
        queue[end++] = pixel;
      }
    }
    while (next < end) {
      const pixel = queue[next++];
      const x = pixel % width;
      const neighbors = [pixel - width, pixel + width];
      if (x > 0) neighbors.push(pixel - 1);
      if (x < width - 1) neighbors.push(pixel + 1);
      for (const neighbor of neighbors) {
        if (neighbor < 0 || neighbor >= visited.length || visited[neighbor]) continue;
        visited[neighbor] = 1;
        const offset = neighbor * 4;
        const red = data[offset];
        const green = data[offset + 1];
        const blue = data[offset + 2];
        if (Math.max(red, green, blue) < 62 && Math.max(red, green, blue) - Math.min(red, green, blue) < 18) {
          data[offset + 3] = 0;
          queue[end++] = neighbor;
        }
      }
    }
    const softenedAlpha = await sharp(data, { raw: info }).extractChannel(3).blur(0.5).raw().toBuffer();
    for (let pixel = 0; pixel < visited.length; pixel++) data[pixel * 4 + 3] = softenedAlpha[pixel];
    cutout = await sharp(data, { raw: info }).png().toBuffer();
  }
  return sharp(cutout).trim({ threshold: 1 }).png().toBuffer();
}

await mkdir(destinationDirectory, { recursive: true });

for (const food of foods) {
  const cutout = await maskedPixels(food.source, food.paths.join(" "), food.removeNeutralRim);
  await sharp(cutout)
    .resize(canvasSize - 60, canvasSize - 60, { fit: "contain", background: "#00000000" })
    .extend({ top: 30, right: 30, bottom: 30, left: 30, background: "#00000000" })
    .webp({ quality: 92, alphaQuality: 100, effort: 6 })
    .toFile(path.join(destinationDirectory, `${food.name}.webp`));
}

for (const [name, pastry] of Object.entries(pastryPieces)) {
  const layers = [];
  for (const part of pastry.parts) {
    const cutout = await maskedPixels(pastry.source, part.path);
    const input = await sharp(cutout)
      .rotate(part.rotate, { background: "#00000000" })
      .resize({ width: part.width })
      .png()
      .toBuffer();
    layers.push({ input, left: part.left, top: part.top });
  }
  await sharp({ create: { width: canvasSize, height: canvasSize, channels: 4, background: "#00000000" } })
    .composite(layers)
    .webp({ quality: 92, alphaQuality: 100, effort: 6 })
    .toFile(path.join(destinationDirectory, `${name}.webp`));
}

console.log(`Prepared ${foods.length + Object.keys(pastryPieces).length} transparent food images.`);
