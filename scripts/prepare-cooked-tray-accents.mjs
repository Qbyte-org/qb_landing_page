import { mkdir, readFile, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import path from "node:path";

const sharp = createRequire(import.meta.resolve("next/package.json"))("sharp");
const sourceRoot = "public/images/food/pinterest";
const outputRoot = "public/images/food/cooked-tray-accents";
// Silhouettes follow the prepared components in the actual hero photos.
// Coordinates use a 600px square, with each unmodified photo contained within it.
const pieces = [
  {
    file: "jollof-plantain", source: "jollof-chicken-plantain", name: "Fried plantain",
    shape: "M168 102 C183 87 199 67 220 55 C247 39 274 22 296 14 Q303 11 306 20 L310 36 Q307 49 296 57 C275 68 257 80 240 87 L214 106 Q200 116 183 130 L174 130 Q167 117 168 102 Z",
  },
  {
    file: "jollof-chicken", source: "jollof-chicken-plantain", name: "Pepper-glazed chicken",
    shape: "M161 447 L169 437 182 433 198 429 218 424 236 428 248 425 264 430 280 424 297 420 314 426 331 431 349 434 361 445 372 449 380 465 384 480 394 491 393 505 402 517 407 529 399 540 382 542 373 548 353 550 338 556 318 552 299 551 281 544 263 541 241 534 221 525 207 517 192 506 181 493 173 479 164 464 Z",
  },
  {
    file: "ofada-egg", source: "ofada-rice-ayamase", name: "Ayamase egg",
    shape: "M310 92 C314 71 334 57 355 51 C380 43 410 52 427 66 C442 79 450 98 445 119 L437 123 429 120 422 125 413 126 405 130 397 129 390 134 382 130 374 133 369 126 361 129 355 121 347 117 344 109 334 105 326 101 317 98 Z",
  },
  {
    file: "ofada-rice", source: "ofada-rice-ayamase", name: "Ofada rice",
    shape: "M149 312 L158 302 165 298 174 302 177 293 190 294 202 295 216 295 225 300 239 299 243 310 255 313 264 321 273 326 278 336 286 344 284 354 293 360 297 371 300 382 307 391 307 405 316 419 310 429 322 440 318 451 326 461 319 470 316 480 304 485 297 488 282 496 269 503 251 508 237 511 224 520 218 516 208 519 199 515 190 520 183 513 173 515 165 507 154 507 147 501 136 501 130 493 119 494 114 484 106 481 101 470 98 460 86 455 84 442 87 431 79 421 84 412 84 402 94 391 96 379 102 368 109 359 119 351 122 340 135 332 137 322 Z",
  },
  {
    file: "yam-portion", source: "pounded-yam-greens", name: "Cooked yam",
    shape: "M157 308 Q171 288 194 281 L223 275 242 276 252 285 259 300 263 318 267 331 265 342 267 353 255 362 Q234 372 212 374 Q188 373 169 365 Q155 357 152 341 Q149 321 157 308 Z",
  },
  {
    file: "vegetable-fish", source: "pounded-yam-greens", name: "Fish in vegetable soup",
    shape: "M247 164 L254 157 266 156 275 159 281 167 291 172 299 173 305 177 313 173 320 177 327 180 331 187 339 190 343 200 345 212 340 219 335 217 331 212 326 215 320 207 310 205 303 208 293 204 282 205 273 201 265 198 258 190 252 180 Z",
  },
  {
    file: "pepper-soup-meat", source: "assorted-meat-pepper-soup", name: "Slow-cooked pepper-soup meat",
    shape: "M307 151 L320 147 332 146 342 145 353 142 366 141 379 144 389 145 399 151 405 162 405 175 401 186 402 197 395 207 394 218 389 223 385 235 375 237 364 234 355 232 347 226 343 216 337 211 334 202 324 201 316 197 309 197 304 190 302 180 301 170 Z",
  },
  {
    file: "pepper-soup-piece", source: "assorted-meat-pepper-soup", name: "Herb-coated cooked meat",
    shape: "M272 454 L283 454 291 462 300 471 314 474 322 484 335 489 343 500 353 509 360 521 363 534 359 544 350 548 346 558 339 562 337 573 328 581 316 582 309 571 303 564 292 559 281 554 270 549 259 549 247 551 243 545 233 541 230 529 232 515 239 505 241 493 250 486 256 474 264 470 Z",
  },
  {
    file: "akara-crisp", source: "akara-bean-cakes", name: "Crisp akara bean cake",
    shape: "M218 185 Q231 149 260 128 L279 114 295 101 311 96 327 95 342 100 357 104 371 113 384 124 394 136 402 153 410 173 410 190 405 210 402 231 399 252 391 273 381 292 369 307 352 320 331 328 311 333 291 332 273 330 252 320 238 308 229 294 220 277 215 259 211 240 211 219 Z",
  },
  {
    file: "akara-golden", source: "akara-bean-cakes", name: "Golden fried akara",
    shape: "M324 445 L335 429 350 416 368 404 389 395 410 391 431 391 450 394 465 401 478 411 489 425 497 442 502 461 505 478 501 497 492 515 480 535 465 551 446 568 424 582 407 590 389 593 370 590 352 583 338 572 327 558 320 543 315 522 314 503 316 483 319 465 Z",
  },
  {
    file: "puff-puff-bite", source: "puff-puff", name: "Golden puff-puff",
    shape: "M206 35 C213 17 228 8 247 12 L268 14 Q283 18 285 35 C291 50 289 70 282 86 Q274 101 260 107 Q246 113 232 108 Q216 105 208 94 Q201 81 201 64 Q199 48 206 35 Z",
  },
  {
    file: "puff-puff-round", source: "puff-puff", name: "Freshly fried puff-puff",
    shape: "M325 334 L336 322 349 315 365 310 380 303 391 302 400 309 405 322 411 333 418 345 423 359 426 375 427 391 421 410 413 423 402 431 389 433 376 430 361 425 347 419 335 410 326 401 319 391 315 383 314 368 316 351 Z",
  },
];

await mkdir(outputRoot, { recursive: true });
const sourceCredits = JSON.parse(await readFile(path.join(sourceRoot, "sources.json"), "utf8"));
const assets = [];
for (const piece of pieces) {
  const photo = await sharp(path.join(sourceRoot, `${piece.source}.webp`))
    .resize(1200, 1200, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .ensureAlpha().png().toBuffer();
  const mask = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="1200" viewBox="0 0 600 600"><path fill="white" d="${piece.shape}" /></svg>`);
  const cutout = await sharp(photo).composite([{ input: mask, blend: "dest-in" }]).png().toBuffer();
  await sharp(cutout).trim({ threshold: 8 }).resize(440, 440, { fit: "inside", withoutEnlargement: true })
    .extend({ top: 8, bottom: 8, left: 8, right: 8, background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .webp({ quality: 94, alphaQuality: 100 }).toFile(path.join(outputRoot, `${piece.file}.webp`));
  const credit = sourceCredits.photos.find((entry) => entry.file === `${piece.source}.webp`);
  assets.push({ file: `${piece.file}.webp`, subject: piece.name, derivedFrom: `/images/food/pinterest/${piece.source}.webp`, pinUrl: credit.pinUrl, sourceImageUrl: credit.sourceImageUrl });
  console.log(`Prepared ${piece.file}.webp`);
}
await writeFile(path.join(outputRoot, "sources.json"), `${JSON.stringify({ processing: "Prepared food silhouettes extracted from the same photographs used by the restaurant hero. Original photo pixels retained; hand-traced masks remove plates, backgrounds and neighbouring food. Generated with scripts/prepare-cooked-tray-accents.mjs.", assets }, null, 2)}\n`);
