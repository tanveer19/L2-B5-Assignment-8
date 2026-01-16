"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import Link from "next/link";
import { format } from "date-fns";
import { CalendarIcon, MapPinIcon, HeartIcon, SearchIcon } from "lucide-react";
import { api } from "@/lib/api";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export default function Search() {
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [interests, setInterests] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (destination) params.set("destination", destination);
      if (startDate) params.set("startDate", format(startDate, "yyyy-MM-dd"));
      if (endDate) params.set("endDate", format(endDate, "yyyy-MM-dd"));
      if (interests) params.set("interests", interests);

      const res = await api(`/travel-plans/public?${params.toString()}`);
      setResults(res.data);
    } catch (err: any) {
      toast.error(err.message || "Search failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
        Find Your Travel Buddy
      </h1>

      <form
        onSubmit={handleSearch}
        className="bg-white dark:bg-gray-900 border border-blue-100 dark:border-gray-700 p-6 rounded-2xl mb-8 space-y-5 shadow-xl shadow-blue-500/5"
      >
        {/* Destination Input */}
        <div className="relative">
          <MapPinIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-blue-500" />
          <Input
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Where do you want to go?"
            className="pl-10 h-12 rounded-xl border-blue-100 dark:border-gray-700 focus-visible:border-blue-400 focus-visible:ring-blue-400/30"
          />
        </div>

        {/* Date Pickers */}
        <div className="grid grid-cols-2 gap-3">
          {/* Start Date */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full h-12 justify-start text-left font-normal rounded-xl border-blue-100 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-gray-800 hover:border-blue-300 transition-all duration-200 px-3",
                  !startDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 size-4 shrink-0 text-blue-500" />
                <span className="truncate">
                  {startDate ? format(startDate, "MMM d, yyyy") : "Start date"}
                </span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 border-0" align="start">
              <Calendar
                mode="single"
                selected={startDate}
                onSelect={setStartDate}
                disabled={(date) => date < new Date()}
                initialFocus
              />
            </PopoverContent>
          </Popover>

          {/* End Date */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full h-12 justify-start text-left font-normal rounded-xl border-blue-100 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-gray-800 hover:border-blue-300 transition-all duration-200 px-3",
                  !endDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 size-4 shrink-0 text-blue-500" />
                <span className="truncate">
                  {endDate ? format(endDate, "MMM d, yyyy") : "End date"}
                </span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 border-0" align="start">
              <Calendar
                mode="single"
                selected={endDate}
                onSelect={setEndDate}
                disabled={(date) => date < (startDate || new Date())}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Interests Input */}
        <div className="relative">
          <HeartIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-blue-500" />
          <Input
            value={interests}
            onChange={(e) => setInterests(e.target.value)}
            placeholder="Interests (hiking, photography, food...)"
            className="pl-10 h-12 rounded-xl border-blue-100 dark:border-gray-700 focus-visible:border-blue-400 focus-visible:ring-blue-400/30"
          />
        </div>

        {/* Search Button */}
        <Button
          type="submit"
          disabled={loading}
          className="w-full h-12 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold shadow-lg shadow-blue-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/40 hover:scale-[1.02]"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin size-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Searching...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <SearchIcon className="size-5" />
              Find Travel Buddies
            </span>
          )}
        </Button>
      </form>

      {results.length > 0 && (
        <div className="space-y-4">
          {results.map((plan) => (
            <div 
              key={plan.id} 
              className="bg-white dark:bg-gray-900 border border-blue-100 dark:border-gray-700 p-5 rounded-xl shadow-lg shadow-blue-500/5 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-1"
            >
              <h3 className="font-bold text-lg text-gray-800 dark:text-gray-100">
                {plan.destination}
                {plan.city ? ` - ${plan.city}` : ""}
              </h3>
              <p className="text-sm text-blue-600 dark:text-blue-400 font-medium mt-1 flex items-center gap-1">
                <CalendarIcon className="size-4" />
                {new Date(plan.startDate).toLocaleDateString()} -{" "}
                {new Date(plan.endDate).toLocaleDateString()}
              </p>
              <p className="mt-3 text-gray-600 dark:text-gray-300">{plan.description}</p>
              <div className="mt-4 flex items-center justify-between">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Host: <span className="font-medium text-gray-700 dark:text-gray-200">{plan.owner.fullName}</span>
                </p>
                <Link
                  href={`/profile/${plan.owner.id}`}
                  className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium hover:underline transition-colors"
                >
                  View Profile →
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
