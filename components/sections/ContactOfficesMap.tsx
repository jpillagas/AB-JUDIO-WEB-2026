"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import type { Office } from "@/lib/site";

const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

function useCoarsePointer(): boolean {
  const [isCoarse, setIsCoarse] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(pointer: coarse)").matches
  );

  useEffect(() => {
    const mq = window.matchMedia("(pointer: coarse)");
    const update = () => setIsCoarse(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return isCoarse;
}

function MapSync({
  offices,
  selectedId,
}: {
  offices: Office[];
  selectedId: string | null;
}) {
  const map = useMap();

  useEffect(() => {
    if (!offices.length) return;
    const bounds = L.latLngBounds(offices.map((o) => [o.lat, o.lng]));
    map.fitBounds(bounds, { padding: [28, 28], maxZoom: 11 });
  }, [map, offices]);

  useEffect(() => {
    const office = offices.find((o) => o.id === selectedId);
    if (!office) return;
    map.flyTo([office.lat, office.lng], 15, { duration: 0.7 });
  }, [map, offices, selectedId]);

  return null;
}

function MapDraggingSync({ enabled }: { enabled: boolean }) {
  const map = useMap();

  useEffect(() => {
    if (enabled) {
      map.dragging.enable();
    } else {
      map.dragging.disable();
    }
  }, [map, enabled]);

  return null;
}

export default function ContactOfficesMap({
  offices,
  selectedId,
  onSelect,
}: {
  offices: Office[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  const center: [number, number] = [41.0, -73.6];
  const isCoarse = useCoarsePointer();

  return (
    <div
      role="region"
      aria-label="Mapa de sucursales El Abogado Judío"
      className="h-full w-full"
    >
      <MapContainer
        center={center}
        zoom={7}
        className="contact-map h-full w-full"
        scrollWheelZoom
        dragging={!isCoarse}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapSync offices={offices} selectedId={selectedId} />
        <MapDraggingSync enabled={!isCoarse} />
        {offices.map((office) => (
          <Marker
            key={office.id}
            position={[office.lat, office.lng]}
            icon={icon}
            eventHandlers={{ click: () => onSelect(office.id) }}
          >
            <Popup>
              <strong>{office.name}</strong>
              <br />
              {office.address}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
