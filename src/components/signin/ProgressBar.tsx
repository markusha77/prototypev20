import React from 'react'
import { Check } from 'lucide-react'

interface ProgressBarProps {
  steps: string[]
  currentStep: number
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ steps, currentStep }) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {steps.slice(0, -1).map((step, index) => {
          const isCompleted = index < currentStep
          const isActive = index === currentStep
          
          return (
            <React.Fragment key={index}>
              {/* Step circle */}
              <div className="flex flex-col items-center">
                <div 
                  className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                    isCompleted 
                      ? 'bg-indigo-600 border-indigo-600' 
                      : isActive 
                        ? 'border-indigo-600 text-indigo-600' 
                        : 'border-gray-300 text-gray-400'
                  }`}
                >
                  {isCompleted ? (
                    <Check className="h-5 w-5 text-white" />
                  ) : (
                    <span className="text-sm font-medium">{index + 1}</span>
                  )}
                </div>
                <span 
                  className={`mt-2 text-xs font-medium ${
                    isCompleted || isActive ? 'text-indigo-600' : 'text-gray-500'
                  }`}
                >
                  {step}
                </span>
              </div>
              
              {/* Connector line (except after the last step) */}
              {index < steps.length - 2 && (
                <div 
                  className={`flex-1 h-0.5 mx-2 ${
                    index < currentStep ? 'bg-indigo-600' : 'bg-gray-300'
                  }`}
                />
              )}
            </React.Fragment>
          )
        })}
      </div>
    </div>
  )
}
