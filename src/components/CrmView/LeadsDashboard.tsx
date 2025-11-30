import React, { useState, useMemo } from "react";
import {
  ResponsiveContainer,
  CartesianGrid,
  Tooltip,
  Legend,
  XAxis,
  YAxis,
  LineChart,
  Line,
  BarChart,
  Bar,
} from "recharts";
import { format, parseISO, isAfter, isBefore } from "date-fns";

import Button from "@/common/Button";
import CustomDate from "@/common/FormElements/CustomDate";
export const filtersdata = [
  { id: "all", label: "All" },
  { id: "today", label: "Today" },
  { id: "yesterday", label: "Yesterday" },
  { id: "last7Days", label: "Last 7 Days" },
  { id: "last14Days", label: "Last 14 Days" },
  { id: "lastMonth", label: "Last Month" },
  {
    id: "custom",
    label: "Date range",
  },
];
export const leaddata = [
  { id: 1, leadstatus: "New" },
  { id: 2, leadstatus: "Contacted" },
  { id: 3, leadstatus: "Follow-up" },
  { id: 4, leadstatus: "Interested" },
  { id: 5, leadstatus: "Not Interested" },
  { id: 6, leadstatus: "completed" },
  { id: 7, leadstatus: "Site Visit" },
  { id: 8, leadstatus: "Visit Scheduled" },
  { id: 9, leadstatus: "Visit Done" },
  { id: 10, leadstatus: "Not Answered" },
  { id: 11, leadstatus: "Switched Off" },
  { id: 12, leadstatus: "Wrong Number" },
  { id: 13, leadstatus: "DND" },
  { id: 14, leadstatus: "Site visited" },
];

const LeadsDashboard = ({ allLeads }: { allLeads: any[] }) => {
  const [selectedCity, setSelectedCity] = useState("All");
  const [selectedState, setSelectedState] = useState("All");
  type FilterType = (typeof filtersdata)[number]["id"];
  const [selectedDateFilter, setSelectedDateFilter] =
    useState<FilterType>("all");
  const [customRange, setCustomRange] = useState<{
    startDate: string;
    endDate: string;
  }>({
    startDate: "",
    endDate: "",
  });
  const [isOpen, setIsOpen] = useState(false);

  function toLocalDateString(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  function getDateRange(
    filter: FilterType,
    customRange?: { startDate: string; endDate: string }
  ) {
    if (filter === "all") return { startDate: null, endDate: null };

    const now = new Date();
    let startDate: Date;
    let endDate: Date = new Date();

    switch (filter) {
      case "today":
        startDate = new Date();
        startDate.setHours(0, 0, 0, 0);
        endDate.setHours(23, 59, 59, 999);
        break;
      case "yesterday":
        startDate = new Date();
        startDate.setDate(startDate.getDate() - 1);
        startDate.setHours(0, 0, 0, 0);
        endDate = new Date(startDate);
        endDate.setHours(23, 59, 59, 999);
        break;
      case "last7Days":
        startDate = new Date();
        startDate.setDate(startDate.getDate() - 7);
        startDate.setHours(0, 0, 0, 0);
        endDate = new Date();
        break;
      case "last14Days":
        startDate = new Date();
        startDate.setDate(startDate.getDate() - 14);
        startDate.setHours(0, 0, 0, 0);
        endDate = new Date();
        break;
      case "lastMonth":
        startDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        endDate = new Date(now.getFullYear(), now.getMonth(), 0);
        endDate.setHours(23, 59, 59, 999);
        break;
      case "custom":
        if (!customRange) throw new Error("Custom range required");
        startDate = new Date(customRange.startDate);
        endDate = new Date(customRange.endDate);
        break;
      default:
        return { startDate: null, endDate: null };
    }

    return {
      startDate: toLocalDateString(startDate),
      endDate: toLocalDateString(endDate),
    };
  }

  const dateFilteredLeads = useMemo(() => {
    if (selectedDateFilter === "all") return allLeads;

    const { startDate, endDate } = getDateRange(
      selectedDateFilter,
      customRange
    );
    if (!startDate || !endDate) return allLeads;

    return allLeads.filter((lead) => {
      const leadDate = new Date(lead.createdAt);
      return (
        !isBefore(leadDate, new Date(startDate)) &&
        !isAfter(leadDate, new Date(endDate))
      );
    });
  }, [allLeads, selectedDateFilter, customRange]);

  const states = useMemo(() => {
    return [
      "All",
      ...Array.from(
        new Set(dateFilteredLeads.map((l) => l.state).filter(Boolean))
      ),
    ];
  }, [dateFilteredLeads]);

  const cities = useMemo(() => {
    if (selectedState === "All") {
      return [
        "All",
        ...Array.from(
          new Set(
            dateFilteredLeads
              .map((l) => l.city?.trim().toLowerCase())
              .filter(Boolean)
          )
        ).map((city) => city.charAt(0).toUpperCase() + city.slice(1)),
      ];
    }
    return [
      "All",
      ...Array.from(
        new Set(
          dateFilteredLeads
            .filter((l) => l.state === selectedState)
            .map((l) => l.city?.trim().toLowerCase())
            .filter(Boolean)
        )
      ).map((city) => city.charAt(0).toUpperCase() + city.slice(1)),
    ];
  }, [selectedState, dateFilteredLeads]);

  const filteredLeads = useMemo(() => {
    return dateFilteredLeads.filter((l) => {
      return (
        (selectedState === "All" || l.state === selectedState) &&
        (selectedCity === "All" || l.city === selectedCity)
      );
    });
  }, [selectedCity, selectedState, dateFilteredLeads]);

  const leadsByStatus = useMemo(
    () =>
      leaddata.map((status) => ({
        name: status.leadstatus,
        value: filteredLeads.filter((l) => l.leadstatus === status.leadstatus)
          .length,
      })),
    [filteredLeads]
  );

  const leadsOverTime = useMemo(() => {
    const grouped: Record<string, number> = {};
    filteredLeads.forEach((l) => {
      const date = format(parseISO(l.createdAt), "yyyy-MM-dd");
      grouped[date] = (grouped[date] || 0) + 1;
    });
    return Object.keys(grouped).map((date) => ({
      date,
      count: grouped[date],
    }));
  }, [filteredLeads]);
  //     const leadsByStatus = useMemo(
  //     () =>
  //       leaddata.map((status) => ({
  //         name: status.leadstatus,
  //         value: filteredLeads.filter((l) => l.leadstatus === status.leadstatus).length,
  //       })),
  //     [filteredLeads]
  //   );

  //   // ✅ Leads Over Time
  //   const leadsOverTime = useMemo(() => {
  //     const grouped: Record<string, number> = {};
  //     filteredLeads.forEach((l) => {
  //       const date = format(parseISO(l.createdAt), "yyyy-MM-dd");
  //       grouped[date] = (grouped[date] || 0) + 1;
  //     });
  //     return Object.keys(grouped).map((date) => ({
  //       date,
  //       count: grouped[date],
  //     }));
  //   }, [filteredLeads]);

  // ✅ Leads by Property Type
  const leadsByProperty = useMemo(() => {
    const grouped: Record<string, number> = {};
    filteredLeads.forEach((l) => {
      if (l.propertytype) {
        grouped[l.propertytype] = (grouped[l.propertytype] || 0) + 1;
      }
    });
    return Object.keys(grouped).map((property) => ({
      property,
      count: grouped[property],
    }));
  }, [filteredLeads]);

  const leadsByCategory = useMemo(() => {
    const grouped: Record<string, number> = {};
    filteredLeads.forEach((l) => {
      if (l.serviceType) {
        grouped[l.serviceType] = (grouped[l.serviceType] || 0) + 1;
      }
    });
    return Object.keys(grouped).map((category) => ({
      name: category,
      value: grouped[category],
    }));
  }, [filteredLeads]);

  return (
    <div className="md:p-6 py-2 px-1 md:space-y-8 space-y-4 w-full">
      <div className="flex items-center md:gap-2 gap-1">
        <div className="relative">
          <Button
            onClick={() => setIsOpen(!isOpen)}
            className="md:px-4 px-2  md:py-2 py-1 md:text-[12px] text-[10px] border rounded-lg shadow font-Gordita-Medium bg-white"
          >
            {selectedDateFilter === "all" ? "All Time" : selectedDateFilter}
          </Button>
          {isOpen && (
            <div className="absolute top-12 left-0 bg-white border shadow-lg rounded-lg z-50 w-60">
              <ul className="py-2">
                {[
                  "all",
                  "today",
                  "yesterday",
                  "last7Days",
                  "last14Days",
                  "lastMonth",
                  "custom",
                ].map((filter) => (
                  <li
                    key={filter}
                    className="md:px-4 px-2  md:py-2 py-1 md:text-[12px] text-[10px] font-Gordita-Medium hover:bg-gray-100 cursor-pointer"
                  >
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="dateFilter"
                        checked={selectedDateFilter === filter}
                        onChange={() => setSelectedDateFilter(filter)}
                      />
                      {filter}
                    </label>
                    {filter === "custom" && selectedDateFilter === "custom" && (
                      <div className="flex flex-col gap-2 mt-2">
                        <CustomDate
                          type="date"
                          label={" Start Date "}
                          labelCls="md:text-[12px] mt-2 text-[10px] font-Gordita-Medium"
                          placeholder="Date"
                          className="px-3 md:py-1 py-[2px]"
                          name="date"
                          value={customRange.startDate}
                          onChange={(e) =>
                            setCustomRange({
                              ...customRange,
                              startDate: e.target.value,
                            })
                          }
                        />
                        <CustomDate
                          type="date"
                          label={" End Date "}
                          labelCls="md:text-[12px] mt-2 text-[10px] font-Gordita-Medium"
                          placeholder="Date"
                          className="px-3 md:py-1 py-[2px]"
                          name="date"
                          value={customRange.endDate}
                          onChange={(e) =>
                            setCustomRange({
                              ...customRange,
                              endDate: e.target.value,
                            })
                          }
                        />
                      </div>
                    )}
                  </li>
                ))}
              </ul>
              <div className="flex justify-end px-3 py-2 gap-2">
                <Button
                  className="md:px-3 px-1 md:py-1 py-1 md:text-[12px] text-[10px] font-Gordita-Medium border rounded text-sm"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-4">
          <select
            value={selectedState}
            onChange={(e) => {
              setSelectedState(e.target.value);
              setSelectedCity("All");
            }}
            className="md:px-4 px-2  md:py-2 py-1 md:text-[12px] text-[10px] font-Gordita-Medium border rounded-lg shadow"
          >
            {states.map((state) => (
              <option key={state}>{state}</option>
            ))}
          </select>

          {selectedState !== "All" && (
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="md:px-4 px-2  md:py-2 py-1 md:text-[12px] text-[10px] font-Gordita-Medium border rounded-lg shadow"
            >
              {cities.map((city) => (
                <option key={city}>{city}</option>
              ))}
            </select>
          )}
        </div>
      </div>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
        <div className="bg-white md:rounded-2xl md:space-y-4 space-y-2 rounded-[6px] shadow-custom md:p-4 p-2">
          <h2 className="md:text-[16px] text-[14px] font-Gordita-Bold">
            Leads Over Time
          </h2>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={leadsOverTime}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tick={{
                  className:
                    "font-Gordita-Medium md:text-[12px] text-black text-[12px]",
                }}
              />
              <YAxis
                tick={{
                  className:
                    "font-Gordita-Medium md:text-[12px] text-black text-[12px]",
                }}
              />
              <Tooltip
                contentStyle={{
                  fontFamily: "Gordita-Medium",
                  fontSize: "12px",
                  borderRadius: "8px",
                  backgroundColor: "white",
                  border: "1px solid #e5e7eb",
                }}
                labelStyle={{
                  fontFamily: "Gordita-Medium",
                  fontSize: "12px",
                }}
              />
              <Legend
                wrapperStyle={{
                  fontFamily: "Gordita-Medium",
                  fontSize: "12px",
                  paddingTop: "8px",
                }}
              />
              <Line
                type="monotone"
                dataKey="count"
                stroke="#4F46E5"
                strokeWidth={3}
                dot
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white w-full md:rounded-2xl md:space-y-4 space-y-2 rounded-[6px] shadow-custom md:p-4 p-2">
          <h2 className="md:text-[16px] text-[14px] font-Gordita-Bold">
            Leads by Status
          </h2>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart
              data={leadsByStatus}
              layout="vertical"
              margin={{ top: 20, right: 30, left: 100, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                type="number"
                tick={{
                  className:
                    "font-Gordita-Medium md:text-[12px] text-black text-[12px]",
                }}
              />
              <YAxis
                type="category"
                dataKey="name"
                width={window.innerWidth < 768 ? 40 : 120}
                tick={{
                  className:
                    "font-Gordita-Medium md:text-[12px] text-black text-[12px]",
                }}
              />
              <Tooltip
                contentStyle={{
                  fontFamily: "Gordita-Medium",
                  fontSize: "12px",
                  borderRadius: "8px",
                  backgroundColor: "white",
                  border: "1px solid #e5e7eb",
                }}
                labelStyle={{
                  fontFamily: "Gordita-Medium",
                  fontSize: "12px",
                }}
              />
              <Legend
                wrapperStyle={{
                  fontFamily: "Gordita-Medium",
                  fontSize: "12px",
                  paddingTop: "8px",
                }}
              />
              <Bar dataKey="value" fill="#3B82F6" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white md:rounded-2xl md:space-y-4 space-y-2 rounded-[6px] shadow-custom md:p-4 p-2">
          <h2 className="md:text-[16px] text-[14px] font-Gordita-Bold">
            Leads by Property Type
          </h2>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={leadsByProperty} barCategoryGap="40%">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="property"
                tick={{
                  className:
                    "font-Gordita-Medium md:text-[12px] text-black text-[12px]",
                }}
              />
              <YAxis
                tick={{
                  className:
                    "font-Gordita-Medium md:text-[12px] text-black text-[12px]",
                }}
              />
              <Tooltip
                contentStyle={{
                  fontFamily: "Gordita-Medium",
                  fontSize: "12px",
                  borderRadius: "8px",
                  backgroundColor: "white",
                  border: "1px solid #e5e7eb",
                }}
                labelStyle={{
                  fontFamily: "Gordita-Medium",
                  fontSize: "12px",
                }}
              />
              <Legend
                wrapperStyle={{
                  fontFamily: "Gordita-Medium",
                  fontSize: "12px",
                  paddingTop: "8px",
                }}
              />
              <Bar
                dataKey="count"
                fill="#06B6D4"
                radius={[6, 6, 0, 0]}
                barSize={20}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white md:rounded-2xl  md:space-y-4 space-y-2 rounded-[6px] shadow-custom md:p-4 p-2">
          <h2 className="md:text-[16px] text-[14px] font-Gordita-Bold">
            Leads by Category
          </h2>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart
              data={leadsByCategory}
              layout="vertical"
              barCategoryGap="40%"
              margin={{ top: 20, right: 30, left: 100, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                type="number"
                tick={{
                  className:
                    "font-Gordita-Medium md:text-[12px] text-black text-[12px]",
                }}
              />
              <YAxis
                type="category"
                dataKey="name"
                width={window.innerWidth < 768 ? 40 : 120}
                tick={{
                  className:
                    "font-Gordita-Medium text-[12px] text-black md:text-[12px]",
                }}
              />

              <Tooltip
                contentStyle={{
                  fontFamily: "Gordita-Medium",
                  fontSize: "12px",
                  borderRadius: "8px",
                  backgroundColor: "white",
                  border: "1px solid #e5e7eb",
                }}
                labelStyle={{
                  fontFamily: "Gordita-Medium",
                  fontSize: "12px",
                }}
              />
              <Legend
                wrapperStyle={{
                  fontFamily: "Gordita-Medium",
                  fontSize: "12px",
                  paddingTop: "8px",
                }}
              />
              <Bar
                dataKey="value"
                fill="#8B5CF6"
                radius={[0, 6, 6, 0]}
                barSize={20}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default LeadsDashboard;
