interface ContinueButtonProps {
    onClick: () => void;
    children?: React.ReactNode;
  }
  
  export function ContinueButton({ onClick, children }: ContinueButtonProps) {
    return (
      <button 
        onClick={onClick}
        className="w-full bg-[#0066FF] text-white rounded-full py-4 font-medium"
      >
        {children}
      </button>
    );
  }