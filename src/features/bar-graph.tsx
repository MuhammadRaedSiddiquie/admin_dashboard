'use client';

import * as React from 'react';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';

export const description = 'An interactive bar chart';

const chartData = [
  { date: '2024-04-01', desktop: 1, mobile: 1 },
  { date: '2024-04-02', desktop: 1, mobile: 1 },
  { date: '2024-04-03', desktop: 1, mobile: 1 },
  { date: '2024-04-04', desktop: 1, mobile: 1 },
  { date: '2024-04-05', desktop: 1, mobile: 1 },
  { date: '2024-04-06', desktop: 1, mobile: 1 },
  { date: '2024-04-07', desktop: 1, mobile: 1 },
  { date: '2024-04-08', desktop: 1, mobile: 1 },
  { date: '2024-04-09', desktop: 1, mobile: 1 },
  { date: '2024-04-10', desktop: 1, mobile: 1 },
  { date: '2024-04-11', desktop: 1, mobile: 1 },
  { date: '2024-04-12', desktop: 1, mobile: 1 },
  { date: '2024-04-13', desktop: 1, mobile: 1 },
  { date: '2024-04-14', desktop: 1, mobile: 1 },
  { date: '2024-04-15', desktop: 1, mobile: 1 },
  { date: '2024-04-16', desktop: 1, mobile: 1 },
  { date: '2024-04-17', desktop: 1, mobile: 1 },
  { date: '2024-04-18', desktop: 1, mobile: 1 },
  { date: '2024-04-19', desktop: 1, mobile: 1 },
  { date: '2024-04-20', desktop: 1, mobile: 1 },
  { date: '2024-04-21', desktop: 1, mobile: 1 },
  { date: '2024-04-22', desktop: 1, mobile: 1 },
  { date: '2024-04-23', desktop: 1, mobile: 1 },
  { date: '2024-04-24', desktop: 1, mobile: 1 },
  { date: '2024-04-25', desktop: 1, mobile: 1 },
  { date: '2024-04-26', desktop: 1, mobile: 1 },
  { date: '2024-04-27', desktop: 1, mobile: 1 },
  { date: '2024-04-28', desktop: 1, mobile: 1 },
  { date: '2024-04-29', desktop: 1, mobile: 1 },
  { date: '2024-04-30', desktop: 1, mobile: 1 },
  { date: '2024-05-01', desktop: 1, mobile: 1 },
  { date: '2024-05-02', desktop: 1, mobile: 1 },
  { date: '2024-05-03', desktop: 1, mobile: 1 },
  { date: '2024-05-04', desktop: 1, mobile: 1 },
  { date: '2024-05-05', desktop: 1, mobile: 1 },
  { date: '2024-05-06', desktop: 1, mobile: 1 },
  { date: '2024-05-07', desktop: 1, mobile: 1 },
  { date: '2024-05-08', desktop: 1, mobile: 1 },
  { date: '2024-05-09', desktop: 1, mobile: 1 },
  { date: '2024-05-10', desktop: 1, mobile: 1 },
  { date: '2024-05-11', desktop: 1, mobile: 1 },
  { date: '2024-05-12', desktop: 1, mobile: 1 },
  { date: '2024-05-13', desktop: 1, mobile: 1 },
  { date: '2024-05-14', desktop: 1, mobile: 1 },
  { date: '2024-05-15', desktop: 1, mobile: 1 },
  { date: '2024-05-16', desktop: 1, mobile: 1 },
  { date: '2024-05-17', desktop: 1, mobile: 1 },
  { date: '2024-05-18', desktop: 1, mobile: 1 },
  { date: '2024-05-19', desktop: 1, mobile: 1 },
  { date: '2024-05-20', desktop: 1, mobile: 1 },
  { date: '2024-05-21', desktop: 1, mobile: 1 },
  { date: '2024-05-22', desktop: 1, mobile: 1 },
  { date: '2024-05-23', desktop: 1, mobile: 1 },
  { date: '2024-05-24', desktop: 1, mobile: 1 },
  { date: '2024-05-25', desktop: 1, mobile: 1 },
  { date: '2024-05-26', desktop: 1, mobile: 1 },
  { date: '2024-05-27', desktop: 1, mobile: 1 },
  { date: '2024-05-28', desktop: 1, mobile: 1 },
  { date: '2024-05-29', desktop: 1, mobile: 1 },
  { date: '2024-05-30', desktop: 1, mobile: 1 },
  { date: '2024-05-31', desktop: 1, mobile: 1 },
  { date: '2024-06-01', desktop: 1, mobile: 1 },
  { date: '2024-06-02', desktop: 1, mobile: 1 },
  { date: '2024-06-03', desktop: 1, mobile: 1 },
  { date: '2024-06-04', desktop: 1, mobile: 1 },
  { date: '2024-06-05', desktop: 1, mobile: 1 },
  { date: '2024-06-06', desktop: 1, mobile: 1 },
  { date: '2024-06-07', desktop: 1, mobile: 1 },
  { date: '2024-06-08', desktop: 1, mobile: 1 },
  { date: '2024-06-09', desktop: 1, mobile: 1 },
  { date: '2024-06-10', desktop: 1, mobile: 1 },
  { date: '2024-06-11', desktop: 1, mobile: 1 },
  { date: '2024-06-12', desktop: 1, mobile: 1 },
  { date: '2024-06-13', desktop: 1, mobile: 1 },
  { date: '2024-06-14', desktop: 1, mobile: 1 },
  { date: '2024-06-15', desktop: 1, mobile: 1 },
  { date: '2024-06-16', desktop: 1, mobile: 1 },
  { date: '2024-06-17', desktop: 1, mobile: 1 },
  { date: '2024-06-18', desktop: 1, mobile: 1 },
  { date: '2024-06-19', desktop: 1, mobile: 1 },
  { date: '2024-06-20', desktop: 1, mobile: 1 },
  { date: '2024-06-21', desktop: 1, mobile: 1 },
  { date: '2024-06-22', desktop: 1, mobile: 1 },
  { date: '2024-06-23', desktop: 1, mobile: 1 },
  { date: '2024-06-24', desktop: 1, mobile: 1 },
  { date: '2024-06-25', desktop: 1, mobile: 1 },
  { date: '2024-06-26', desktop: 1, mobile: 1 },
  { date: '2024-06-27', desktop: 1, mobile: 1 },
  { date: '2024-06-28', desktop: 1, mobile: 1 },
  { date: '2024-06-29', desktop: 1, mobile: 1 },
  { date: '2024-06-30', desktop: 1, mobile: 1 }
];

const chartConfig = {
  views: {
    label: 'Page Views'
  },
  desktop: {
    label: 'Desktop',
    color: 'hsl(var(--chart-1))'
  },
  mobile: {
    label: 'Mobile',
    color: 'hsl(var(--chart-2))'
  },
  error: {
    label: 'Error',
    color: 'hsl(var(--chart-2))'
  }
} satisfies ChartConfig;

export function BarGraph() {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>('desktop');

  const total = React.useMemo(
    () => ({
      desktop: chartData.reduce((acc, curr) => acc + curr.desktop, 0),
      mobile: chartData.reduce((acc, curr) => acc + curr.mobile, 0)
    }),
    []
  );

  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  React.useEffect(() => {
    if (activeChart === 'error') {
      throw new Error('Mocking Error');
    }
  }, [activeChart]);

  if (!isClient) {
    return null;
  }

  return (
    <Card>
      <CardHeader className='flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row'>
        <div className='flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6'>
          <CardTitle>Bar Chart - Interactive</CardTitle>
          <CardDescription>
            Showing total visitors for the last 3 months
          </CardDescription>
        </div>
        <div className='flex'>
          {['desktop', 'mobile', 'error'].map((key) => {
            const chart = key as keyof typeof chartConfig;
            if (!chart || total[key as keyof typeof total] === 0) return null;
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className='relative flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6'
                onClick={() => setActiveChart(chart)}
              >
                <span className='text-xs text-muted-foreground'>
                  {chartConfig[chart].label}
                </span>
                <span className='text-lg font-bold leading-none sm:text-3xl'>
                  {total[key as keyof typeof total]?.toLocaleString()}
                </span>
              </button>
            );
          })}
        </div>
      </CardHeader>
      <CardContent className='px-2 sm:p-6'>
        <ChartContainer
          config={chartConfig}
          className='aspect-auto h-[280px] w-full'
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey='date'
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric'
                });
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className='w-[150px]'
                  nameKey='views'
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    });
                  }}
                />
              }
            />
            <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}