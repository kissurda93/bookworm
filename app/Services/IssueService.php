<?php

namespace App\Services;

use App\Models\Book;
use App\Models\User;
use App\Models\Issue;

class IssueService
{
  public function createIssue(User $user, Book $book, array $validated): Issue
  {
    $issue = Issue::create([
      'user_id' => $user->id,
      'book_id' => $book->id,
      'issue_date' => date('Y-m-d'),
      'expire_date' => $this->calculateExpireDate($validated['month']),
    ]);

    $user->issues()->save($issue);
    $book->issues()->save($issue);

    return $issue;
  }

  public function updateIssue(Issue $issue, array $validated): Issue
  {
    foreach ($validated as $key => $value) {
      $issue[$key] = $value;
    }

    $issue->save();
    return $issue;
  }

  private function calculateExpireDate(int $month): string
  {
    $currentDate = date('Y-m-d');

    $array = explode('-', $currentDate);
    $array[1] = $array[1] + $month;
    $expireDate = implode('-', $array);

    return $expireDate;
  }
}