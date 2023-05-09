#include <bits/stdc++.h>
using namespace std;

int size = 8;

class CFCFS
{
public:
    void dSched(int arr[], int head)
    {
        int seek_count = 0;
        int distance, cur_track;
        for (int i = 0; i < size; i++)
        {
            cur_track = arr[i];
            distance = abs(cur_track - head);
            seek_count += distance;
            head = cur_track;
        }
        cout << "Total number of seek operations = "
             << seek_count << endl;
    };
};
class CSSTF
{
public:
    void calculatedifference(int request[], int head, int diff[][2], int n)
    {
        for (int i = 0; i < n; i++)
        {
            diff[i][0] = abs(head - request[i]);
        }
    }

    int findMIN(int diff[][2], int n)
    {
        int index = -1;
        int minimum = 1e9;

        for (int i = 0; i < n; i++)
        {
            if (!diff[i][1] && minimum > diff[i][0])
            {
                minimum = diff[i][0];
                index = i;
            }
        }
        return index;
    }
    void dSched(int request[], int head)
    {
        if (size == 0)
        {
            return;
        }

        int diff[size][2] = {{0, 0}};
        int seekcount = 0;

        int seeksequence[size + 1] = {0};

        for (int i = 0; i < size; i++)
        {
            seeksequence[i] = head;
            calculatedifference(request, head, diff, size);
            int index = findMIN(diff, size);
            diff[index][1] = 1;

            seekcount += diff[index][0];

            head = request[index];
        }
        seeksequence[size] = head;

        cout << "Total number of seek operations = "
             << seekcount << endl;
    }
};
class CC_SCAN
{
public:
    void dSched(int arr[], int head)
    {
        int disk_size = 200;
        int seek_count = 0;
        int distance, cur_track;
        vector<int> left, right;
        vector<int> seek_sequence;

        left.push_back(0);
        right.push_back(disk_size - 1);

        for (int i = 0; i < size; i++)
        {
            if (arr[i] < head)
                left.push_back(arr[i]);
            if (arr[i] > head)
                right.push_back(arr[i]);
        }
        sort(left.begin(), left.end());
        sort(right.begin(), right.end());
        for (int i = 0; i < right.size(); i++)
        {
            cur_track = right[i];
            seek_sequence.push_back(cur_track);
            distance = abs(cur_track - head);
            seek_count += distance;
            head = cur_track;
        }
        head = 0;
        seek_count += (disk_size - 1);
        for (int i = 0; i < left.size(); i++)
        {
            cur_track = left[i];
            seek_sequence.push_back(cur_track);
            distance = abs(cur_track - head);
            seek_count += distance;
            head = cur_track;
        }
        cout << "Total number of seek operations = "
             << seek_count << endl;
    };
};
class CC_LOOK
{
public:
    void dSched(int arr[], int head)
    {
        int seek_count = 0;
        int distance, cur_track;
        vector<int> left, right;
        vector<int> seek_sequence;
        int disk_size = 200;

        for (int i = 0; i < size; i++)
        {
            if (arr[i] < head)
                left.push_back(arr[i]);
            if (arr[i] > head)
                right.push_back(arr[i]);
        }

        std::sort(left.begin(), left.end());
        std::sort(right.begin(), right.end());

        for (int i = 0; i < right.size(); i++)
        {
            cur_track = right[i];

            seek_sequence.push_back(cur_track);
            distance = abs(cur_track - head);
            seek_count += distance;
            head = cur_track;
        }
        seek_count += abs(head - left[0]);
        head = left[0];

        for (int i = 0; i < left.size(); i++)
        {
            cur_track = left[i];
            seek_sequence.push_back(cur_track);
            distance = abs(cur_track - head);
            seek_count += distance;
            head = cur_track;
        }

        cout << "Total number of seek operations = "
             << seek_count << endl;
    };
};
int main()
{
    int choice;
    cout << "1) FCFC \t 2) SSTF \t 3) C-SCAN \t 4) C-LOOK" << endl
         << "Enter Choice: ";
    cin >> choice;
    int arr[size] = {176, 79, 34, 60, 92, 11, 41, 114};
    int head;
    switch (choice)
    {
    case 1:
        CFCFS obj;
        cout << "Enter Head: ";
        cin >> head;
        obj.dSched(arr, head);
        break;
    case 2:
        CSSTF obj1;
        cout << "Enter Head: ";
        cin >> head;
        obj1.dSched(arr, head);
        break;
    case 3:
        CC_SCAN obj2;
        cout << "Enter Head: ";
        cin >> head;
        obj2.dSched(arr, head);
        break;
    case 4:
        CC_LOOK obj3;
        cout << "Enter Head: ";
        cin >> head;
        obj2.dSched(arr, head);
        break;
    default:
        break;
    }
    return 0;
};