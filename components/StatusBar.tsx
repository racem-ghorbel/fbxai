import React, { useEffect, useState, useRef } from 'react';
import { ConversionStatus } from '../types';
import { CheckCircleIcon, ClockIcon, ExclamationTriangleIcon, InformationCircleIcon } from './icons/Icons';


const statusConfig = {
    [ConversionStatus.Idle]: {
        text: 'في انتظار رفع الملفات وبدء العملية.',
        color: 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300',
        Icon: InformationCircleIcon,
    },
    [ConversionStatus.Processing]: {
        text: 'جاري معالجة الصور... قد تستغرق هذه العملية عدة دقائق.',
        color: 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300',
        Icon: ClockIcon,
    },
    [ConversionStatus.Ready]: {
        text: 'اكتمل التحويل بنجاح! الملفات جاهزة للتحميل.',
        color: 'bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300',
        flashColor: 'bg-green-300 dark:bg-green-700 text-green-800 dark:text-green-100',
        Icon: CheckCircleIcon,
    },
    [ConversionStatus.Error]: {
        text: 'حدث خطأ أثناء التحويل. الرجاء المحاولة مرة أخرى.',
        color: 'bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300',
        Icon: ExclamationTriangleIcon,
    },
    [ConversionStatus.Uploading]: {
        text: 'جاري رفع الصور...',
        color: 'bg-yellow-100 dark:bg-yellow-900/50 text-yellow-700 dark:text-yellow-300',
        Icon: ClockIcon,
    }
};


interface StatusBarProps {
  status: ConversionStatus;
}

// Custom hook to get the previous value of a prop or state
const usePrevious = (value: ConversionStatus) => {
    // FIX: Provide an initial value to useRef to resolve the "Expected 1 arguments, but got 0" error.
    const ref = useRef<ConversionStatus | undefined>(undefined);
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
};


const StatusBar: React.FC<StatusBarProps> = ({ status }) => {
    const [isAnimating, setIsAnimating] = useState(false);
    const prevStatus = usePrevious(status);

    useEffect(() => {
        // Trigger animation when status changes from processing to ready
        if (prevStatus === ConversionStatus.Processing && status === ConversionStatus.Ready) {
            setIsAnimating(true);
            // The animation duration is controlled by the CSS transition + this timeout
            const timer = setTimeout(() => setIsAnimating(false), 500);
            return () => clearTimeout(timer);
        }
    }, [status, prevStatus]);

    if (status === ConversionStatus.Idle) {
        return null; // Don't show anything when idle
    }
    
    const config = statusConfig[status];
    
    // Use the flash color if animating and the status is 'Ready', otherwise use the default color.
    const colorClass = isAnimating && status === ConversionStatus.Ready ? statusConfig[ConversionStatus.Ready].flashColor : config.color;

  return (
    <div className={`rounded-lg p-4 flex items-center gap-4 transition-all duration-300 ${colorClass}`}>
      <config.Icon className="w-6 h-6 flex-shrink-0" />
      <p className="font-semibold">{config.text}</p>
      {status === ConversionStatus.Processing && (
          <div className="w-6 h-6 border-2 border-dashed rounded-full animate-spin border-blue-500 mr-auto"></div>
      )}
    </div>
  );
};

export default StatusBar;