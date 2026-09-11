"use client";

import Image from "next/image";
import { Minus, Plus, RotateCcw } from "lucide-react";
import { useId, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import MagneticFillButton from "../ui/MagneticFillButton";
import LinkArrow from "../ui/LinkArrow";

export type PassportMapNode = {
  name: string;
  coordinates?: [number, number];
  mapLabel?: string;
  minZoom?: number;
};

export type PassportMapRestaurant = { name: string; cuisine: string; eta: string };
export type PassportMapCity = { name: string; center: [number, number]; accent: string; radius: number };

// These bounds match the local OpenStreetMap extract; pins share its geographic projection.
const mapBounds = { south: 7.455, west: 4.515, north: 7.545, east: 4.612 };
const mercator = (latitude: number) => Math.log(Math.tan(Math.PI / 4 + latitude * Math.PI / 360));
const north = mercator(mapBounds.north);
const south = mercator(mapBounds.south);
function position([latitude, longitude]: [number, number]) {
  return {
    left: `${(longitude - mapBounds.west) / (mapBounds.east - mapBounds.west) * 100}%`,
    top: `${(north - mercator(latitude)) / (north - south) * 100}%`,
  };
}

export default function PassportLeafletMap({
  city,
  neighbourhoods,
  selectedNode,
  onSelectNode,
}: {
  city: PassportMapCity;
  neighbourhoods: PassportMapNode[];
  selectedNode?: PassportMapNode | null;
  onSelectNode: (node: PassportMapNode | null) => void;
}) {
  const selectId = useId();
  const viewportRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ pointer: number; x: number; y: number; startX: number; startY: number; touch: boolean } | null>(null);
  const [view, setView] = useState({ x: 0, y: 0, zoom: 1 });
  const [dragging, setDragging] = useState(false);

  const boundPan = (x: number, y: number, zoom: number) => {
    const width = viewportRef.current?.clientWidth ?? 400;
    const height = viewportRef.current?.clientHeight ?? 300;
    const mapWidth = Math.min(width, height * 1.45);
    const horizontalLimit = Math.max(0, (mapWidth * zoom - width) / 2);
    const verticalLimit = Math.max(0, (mapWidth * 0.936 * zoom - height) / 2);
    return { x: Math.max(-horizontalLimit, Math.min(horizontalLimit, x)), y: Math.max(-verticalLimit, Math.min(verticalLimit, y)), zoom };
  };
  const zoomBy = (delta: number) => setView((current) => boundPan(current.x, current.y, Math.max(1, Math.min(3, current.zoom + delta))));
  const endDrag = (event: PointerEvent<HTMLDivElement>) => {
    if (dragRef.current?.pointer !== event.pointerId) return;
    dragRef.current = null;
    setDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  };

  return (
    <div className="flex h-full min-h-0 w-full flex-col overflow-hidden rounded-[1.35rem] border border-ink/20 bg-[#f5eddf]">
      <div
        ref={viewportRef}
        role="region"
        aria-label={`Map of ${city.name}. Use plus and minus to zoom, and arrow keys to pan.`}
        tabIndex={0}
        className={`relative min-h-0 flex-1 touch-pan-y overflow-hidden outline-none [container-type:size] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand ${dragging ? "cursor-grabbing" : "cursor-grab"}`}
        onPointerDown={(event) => {
          if (event.button !== 0 || (event.target as HTMLElement).closest("button, a, select")) return;
          dragRef.current = { pointer: event.pointerId, x: event.clientX, y: event.clientY, startX: view.x, startY: view.y, touch: event.pointerType === "touch" };
          event.currentTarget.setPointerCapture(event.pointerId);
          setDragging(true);
        }}
        onPointerMove={(event) => {
          const drag = dragRef.current;
          if (!drag || drag.pointer !== event.pointerId) return;
          setView((current) => boundPan(drag.startX + event.clientX - drag.x, drag.touch ? current.y : drag.startY + event.clientY - drag.y, current.zoom));
        }}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onKeyDown={(event) => {
          if (event.target !== event.currentTarget) return;
          if (event.key === "+" || event.key === "=") { event.preventDefault(); zoomBy(0.5); }
          else if (event.key === "-") { event.preventDefault(); zoomBy(-0.5); }
          else if (event.key === "Home") { event.preventDefault(); setView({ x: 0, y: 0, zoom: 1 }); }
          else if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key)) {
            event.preventDefault();
            setView((current) => boundPan(current.x + (event.key === "ArrowLeft" ? 35 : event.key === "ArrowRight" ? -35 : 0), current.y + (event.key === "ArrowUp" ? 35 : event.key === "ArrowDown" ? -35 : 0), current.zoom));
          }
        }}
      >
        <div
          data-geographic-map
          className="absolute left-1/2 top-1/2 aspect-[1000/936] w-[min(100cqw,145cqh)] select-none"
          style={{ transform: `translate(-50%, -50%) translate(${view.x}px, ${view.y}px) scale(${view.zoom})` }}
        >
          <Image src="/maps/ile-ife-osm.svg" alt="Roads and waterways of Ile-Ife, with the OAU campus to the north" fill unoptimized loading="lazy" draggable={false} className="pointer-events-none object-contain" />
          {neighbourhoods.filter((node) => node.coordinates && view.zoom >= (node.minZoom ?? 1)).map((node) => {
            const active = selectedNode?.name === node.name;
            const labelAnchor = node.name === "Mokuro" ? "80%" : "50%";
            return (
              <div
                key={node.name}
                className="absolute z-10"
                style={{ ...position(node.coordinates!), transform: `translate(-${labelAnchor}, -50%) scale(${1 / view.zoom})`, transformOrigin: `${labelAnchor} 50%`, "--marker-color": city.accent } as CSSProperties}
              >
                <MagneticFillButton
                  ariaLabel={`Explore ${node.name}${node.mapLabel ? `, near ${node.mapLabel}` : ""}`}
                  aria-pressed={active}
                  onClick={() => onSelectNode(active ? null : node)}
                  variant="light"
                  customFillClass="bg-cream-200"
                  customHoverTextColor="#2a211d"
                  className={`min-h-11 max-w-32 rounded-xl border! border-ink/20 px-2.5 py-2 text-[0.7rem] font-bold shadow-sm ${active ? "bg-brand! text-white!" : "bg-paper! text-ink!"}`}
                >
                  {node.name}
                </MagneticFillButton>
                <span aria-hidden="true" style={{ left: labelAnchor }} className="pointer-events-none absolute top-full size-2 -translate-x-1/2 -translate-y-1 rotate-45 border-b border-r border-ink/20 bg-paper" />
              </div>
            );
          })}
        </div>

        <div className="absolute right-2 top-2 z-20 flex flex-col gap-1 rounded-2xl bg-paper/90 p-1 shadow-sm">
          {[
            { label: "Zoom in", icon: Plus, action: () => zoomBy(0.5), disabled: view.zoom >= 3 },
            { label: "Zoom out", icon: Minus, action: () => zoomBy(-0.5), disabled: view.zoom <= 1 },
          ].map(({ label, icon: Icon, action, disabled }) => (
            <MagneticFillButton key={label} ariaLabel={label} onClick={action} disabled={disabled} variant="light" customFillClass="bg-cream-200" customHoverTextColor="#2a211d" className="size-11 rounded-xl bg-paper! text-ink! disabled:opacity-35">
              <Icon className="size-4" aria-hidden="true" />
            </MagneticFillButton>
          ))}
        </div>
        <MagneticFillButton ariaLabel="Reset map" onClick={() => setView({ x: 0, y: 0, zoom: 1 })} variant="light" customFillClass="bg-cream-200" customHoverTextColor="#2a211d" className="absolute! bottom-7 right-2 z-20 size-11 rounded-xl bg-paper! text-ink! shadow-sm">
          <RotateCcw className="size-4" aria-hidden="true" />
        </MagneticFillButton>
        <span aria-hidden="true" className="pointer-events-none absolute left-3 top-3 rounded-full bg-paper/90 px-2 py-1 text-[0.65rem] font-semibold text-ink">N ↑</span>
        <LinkArrow appearance="plain" href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer" className="absolute! bottom-0 right-0 z-20 rounded-tl-md bg-paper/95 px-2 py-1 text-[0.6rem] text-ink underline underline-offset-2 focus-visible:outline-2 focus-visible:outline-brand">© OpenStreetMap contributors</LinkArrow>
      </div>

      <div className="shrink-0 border-t border-ink/10 bg-paper p-2.5">
        <label htmlFor={selectId} className="sr-only">Choose an area of {city.name}</label>
        <select
          id={selectId}
          value={selectedNode?.name ?? ""}
          onChange={(event) => onSelectNode(neighbourhoods.find((node) => node.name === event.target.value) ?? null)}
          className="min-h-11 w-full min-w-0 cursor-pointer rounded-xl border border-ink/15 bg-cream-200 px-3 text-sm font-semibold text-ink outline-none focus-visible:ring-2 focus-visible:ring-brand"
        >
          <option value="">All areas in {city.name}</option>
          {neighbourhoods.map((node) => <option key={node.name} value={node.name}>{node.name}</option>)}
        </select>
      </div>
    </div>
  );
}
