import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MessageSquareText, BellRing, CheckCircle, XCircle } from 'lucide-react';

interface WhatsAppMessageMenuProps {
  onSendMessage: (messageType: 'reminder' | 'confirmation' | 'cancellation') => void;
  disabled?: boolean;
}

const WhatsAppMessageMenu: React.FC<WhatsAppMessageMenuProps> = ({ 
  onSendMessage,
  disabled = false
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          size="sm"
          variant="outline"
          disabled={disabled}
          className="text-emerald-600 border-emerald-200 hover:bg-emerald-50"
        >
          <MessageSquareText className="w-4 h-4 mr-1" />
          Send Message
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem onClick={() => onSendMessage('reminder')} className="cursor-pointer">
          <BellRing className="w-4 h-4 mr-2" />
          <span>Send Reminder</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onSendMessage('confirmation')} className="cursor-pointer">
          <CheckCircle className="w-4 h-4 mr-2" />
          <span>Send Confirmation</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onSendMessage('cancellation')} className="cursor-pointer">
          <XCircle className="w-4 h-4 mr-2" />
          <span>Send Cancellation</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default WhatsAppMessageMenu;
