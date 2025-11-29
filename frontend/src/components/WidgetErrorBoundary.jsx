import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

class WidgetErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Widget Error:", error, errorInfo);
    }

    handleRetry = () => {
        this.setState({ hasError: false, error: null });
    };

    render() {
        if (this.state.hasError) {
            return (
                <div className="h-full w-full min-h-[150px] flex flex-col items-center justify-center p-6 bg-red-500/5 border border-red-500/10 rounded-3xl text-center">
                    <div className="p-3 bg-red-500/10 rounded-full mb-3">
                        <AlertTriangle className="text-red-400" size={24} />
                    </div>
                    <h3 className="text-sm font-bold text-red-400 uppercase tracking-widest mb-1">Widget Unavailable</h3>
                    <p className="text-xs text-red-300/70 mb-4 max-w-[200px]">
                        Something went wrong while loading this component.
                    </p>
                    <button
                        onClick={this.handleRetry}
                        className="flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-bold uppercase tracking-widest rounded-lg transition-colors"
                    >
                        <RefreshCw size={12} /> Retry
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default WidgetErrorBoundary;
